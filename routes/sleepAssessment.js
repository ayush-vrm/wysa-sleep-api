const express = require('express');
const router = express.Router();
const { createAssessment, 
        getAssessmentsByUser, 
        updateAssessment, 
        goal, bedtime, waketime, hours } = require('../controllers/sleepController');
const { auth } = require('../middleware/auth');

// Sleep assessment routes
router.post('/create', auth, createAssessment);

router.get('/:userId', auth, getAssessmentsByUser);

router.put('/:assessment_id', auth, updateAssessment);

// Question-based routes
router.post('/goal', auth, goal);

router.post('/bedtime', auth, bedtime);

router.post('/wake-time', auth, waketime);

router.post('/hours', auth, hours);

module.exports = router;
