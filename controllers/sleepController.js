const SleepAssessment = require('../models/SleepAssessment');
const User = require('../models/User');

// Create new sleep assessment
exports.createAssessment = async (req, res) => {
    try {
        const { user_id, struggle_duration, sleep_time, wake_time, sleep_hours } = req.body;

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newAssessment = new SleepAssessment({
            user_id,  
            struggle_duration,
            sleep_time,
            wake_time,
            sleep_hours
        });

        const savedAssessment = await newAssessment.save();
        return res.status(201).json({
            success: true,
            message: 'Sleep assessment submitted successfully',
            assessment_id: savedAssessment._id
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};

// Retrieve sleep assessments by user
exports.getAssessmentsByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const assessments = await SleepAssessment.find({ user_id: userId }).sort({ created_at: -1 });
        if (assessments.length === 0) {
            return res.status(404).json({ message: 'No assessments found for this user.' });
        }

        return res.status(200).json({
            success: true,
            userId,
            assessments,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message,
        });
    }
};

// Update a sleep assessment
exports.updateAssessment = async (req, res) => {
    try {
        const { assessment_id } = req.params;
        const { struggle_duration, sleep_time, wake_time, sleep_hours } = req.body;

        const updatedAssessment = await SleepAssessment.findByIdAndUpdate(
            assessment_id,
            { struggle_duration, sleep_time, wake_time, sleep_hours },
            { new: true }  
        );

        if (!updatedAssessment) {
            return res.status(404).json({
                success: false,
                message: 'Assessment not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Sleep assessment updated successfully',
            assessment_id: updatedAssessment._id
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};


// Additional questions
exports.goal = async (req, res) => {
    try {
        const { userId, duration } = req.body;

        if (!userId || !['Less than 2 weeks', '2 to 8 weeks', 'More than 8 weeks'].includes(duration)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid request data' 
            });
        }

        // Save to database 

        res.status(200).json({
            success: true,
            message: 'Goal updated successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.bedtime = async (req, res) => {
    const { userId, bedtime } = req.body;

    if (!userId || !bedtime) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request data'
        });
    }

    // Save to database 

    res.status(200).json({
        success: true,
        message: 'Bedtime updated successfully'
    });
};

exports.waketime = async (req, res) => {
    const { userId, wakeTime } = req.body;

    if (!userId || !wakeTime) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request data'
        });
    }

    // Save to database 

    res.status(200).json({
        success: true,
        message: 'Wake time updated successfully'
    });
};

exports.hours = async (req, res) => {
    const { userId, hours } = req.body;

    if (!userId || !['5', '6', '7'].includes(hours)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid request data'
        });
    }

    // Save to database 

    res.status(200).json({
        success: true,
        message: 'Sleep hours updated successfully'
    });
};
