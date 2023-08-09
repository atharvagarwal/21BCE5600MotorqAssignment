const express = require('express');
const router = express.Router();
const { createWorkflow ,adminApproval,getApprovedRequests,getRequests,getRejectedRequests,sortRequests} = require('../controller/adminController');

router.post('/admin/createWorkflow', createWorkflow);
router.post('/admin/approve', adminApproval);
router.get('/admin/getRequests', getRequests);
router.get('/admin/getApprovedRequests', getApprovedRequests);
router.get('/admin/getRejectedRequests', getRejectedRequests);
router.get('/admin/getLatestRequests', sortRequests);


module.exports = router;