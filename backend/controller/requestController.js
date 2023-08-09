const Request= require('../model/requestSchema');
const User=require('../model/userSchema');
const Workflow= require('../model/workflowSchema');
const nodemailer=require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'granville.zulauf@ethereal.email',
        pass: 'dJe1yW6qvNVGeCKNSZ'
    }
});


  
  exports.createRequest = async (req, res) => {
    let { description, userId, workflow,justification } = req.body;
    console.log(req.body);
    try {
      const user = await User.findById(userId);
      console.log(user)
      const workfloww = await Workflow.find({description: workflow.toLowerCase()});
      const workflowId=workfloww[0]._id
      if (!user || !workflowId) {
        return res.status(500).send({ message: 'User not found or Workflow is wrong' });
      }
  
      if (!workflow || !description ||!userId || !justification) {
        return res.status(500).send({ message: 'Some Fields are missing' });
      }
      const timestamp = new Date();
      console.log(timestamp)
      const request = new Request({
        description,
        userId,
        workflowId,
        timestamp,
        justification,
        workflow
      });
  
      await request.save();
  
      res.send(request);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
    }
  }


  exports.approveRequest = async (req, res) => {
    let { requestId } = req.body;
    const request= await Request.findById(requestId);
    const workfloww=await Workflow.findById(request.workflowId);
    let userEmaill=await User.findById(request.userId)
    let userEmail=userEmaill.email
    const workflow = workfloww.description
    try {
        if(workflow==='admin only'){
            res.status(505).send({message:"incorrect workflow"})
        }
    
       else if(workflow==='both'){
            const filter={_id:requestId};
            const update={approverApproved:true}
            let updateRequests=await Request.findByIdAndUpdate(filter,update,{
                new: true,
              });
            if(request.adminApproved==true){
                 updateRequests=await Request.findByIdAndUpdate(filter,{status:true},{
                    new: true,
                  });
                const info = await transporter.sendMail({
                    from: 'granville.zulauf@ethereal.email', // sender address
                    to:userEmail, // list of receivers
                    subject: "Request Approved", // Subject line
                    text: `Your request with description ${request.description} is now approved`, // plain text body
                    html: "<b>YAYYY 😀</b>", // html body
                  });
                  console.log(info.messageId);
            }
            res.status(200).send({message:"approved Successfully"});
        }

        else{
            const filter={_id:requestId};
            const update={approverApproved:true,status:true}
            let updateRequests=await Request.findByIdAndUpdate(filter,update,{
                new: true,
              });
            const info = await transporter.sendMail({
                from: 'granville.zulauf@ethereal.email', // sender address
                to:userEmail, // list of receivers
                subject: "Request Approved", // Subject line
                text: `Your request with description ${request.description} is now approved`, // plain text body
                html: "<b>YAYYY 😀</b>", // html body
              });
              console.log(info.messageId);
              res.status(200).send({message:"approved Successfully"});
        }
  
        
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
    }
  }


  exports.getRequests= async (req, res) => {
    const userId=req.params.id
    try {
        const requests = await Request.find({userId:userId});
        res.status(201).json(requests);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
  }

  exports.getApprovedRequests= async (req, res) => {
    const userId=req.params.id
    try {
        const requests = await Request.find({userId:userId,status:true});
        res.status(201).json(requests);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
  }
