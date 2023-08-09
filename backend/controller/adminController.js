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

  
  exports.createWorkflow = async (req, res) => {
    let { description } = req.body;
    description=description.toLowerCase();
    const workflow = await Workflow.find({description})
    try {
      if(workflow.length>0) {
        res.status(501).send({message:"workflow already exists"});
      }
      else if(!description) {
        res.status(502).send({message:"No description given"});
  
      }
      else{
     const workflow = new Workflow({
        description
      });
  
      await workflow.save();
      res.status(200).send({message:"workflow-created"})
    }} catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
    }
  }

  exports.adminApproval = async (req, res) => {
    let { requestId } = req.body;
    const request= await Request.findById(requestId);
    const workfloww=await Workflow.findById(request.workflowId);
    const workflow = workfloww.description
    const userEmaill=await User.findById(request.userId)
    let userEmail=userEmaill.email
    
    try {
        if(workflow==='admin only'){
            const filter={_id:requestId};
            const update={adminApproved:true,status:true}
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
              console.log(updateRequests);
              res.status(200).send({message:"approved Successfully"});
        }
    
       else if(workflow==='both'){
            const filter={_id:requestId};
            const update={adminApproved:true}
            let updateRequests=await Request.findByIdAndUpdate(requestId,{adminApproved:true},{
                new: true,
              });
            
            if(request.approverApproved==true){
                updateRequests=await Request.findByIdAndUpdate(requestId,{status:true},{
                    new: true,
                  });
                const info = await transporter.sendMail({
                    from: 'granville.zulauf@ethereal.email', // sender address
                    to:userEmail, // list of receivers
                    subject: "Request Approved", // Subject line
                    text: `Your request with description ${request.description} is now approved`, // plain text body
                    html: `<b> YAYY 😀! Your request with description ${request.description} is now approved</b>`, // html body
                  });
                  console.log(info.message);
                  console.log(updateRequests);
            }
            res.status(200).send({message:"approved Successfully"});
        }

        else{
            res.status(500).send({message:"incorrect workflow"})
        }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error' });
    }
  }

  exports.getRequests= async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(201).json(requests);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
  }

  exports.getApprovedRequests= async (req, res) => {
    try {
        const requests = await Request.find({status:true});
        res.status(201).json(requests);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
  }

  exports.getRejectedRequests= async (req, res) => {
    try {
        const requests = await Request.find({status:false});
        res.status(201).json(requests);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
  }

  exports.sortRequests=async(req,res)=>{
    try{
        const requests = await Request.find().sort({ timestamp: -1 });
        res.send(requests);
    }
    catch(e){
        res.status(500).send('server error')
    }
  }