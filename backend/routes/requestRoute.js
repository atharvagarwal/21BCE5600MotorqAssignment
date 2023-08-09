const express = require('express');
const router = express.Router();
const { createRequest,getApprovedRequests,getRequests, approveRequest } = require('../controller/requestController');

router.post('/req/createRequest', createRequest);
router.get('/req/getRequests/:id', getRequests);
router.get('/req/getApprovedRequests/:id', getApprovedRequests);
router.post('/req/approve/', approveRequest);


module.exports = router;