const mongoose = require('mongoose');

const SleepAssessmentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    struggle_duration: {
        type: String,
        required: true,
    },
    sleep_time: {
        type: String,
        required: true,
    },
    wake_time: {
        type: String,
        required: true,
    },
    sleep_hours: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('SleepAssessment', SleepAssessmentSchema);
