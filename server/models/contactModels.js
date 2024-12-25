import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    phone: {
        type: String,
        required: true,
        match: [/^\+94[\d\s\-]{7,15}$/, 'Please enter a valid Sri Lankan phone number starting with +94'],
    },
    type: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
        minlength: [10, 'Message should be at least 10 characters long'],
        maxlength: [50, 'Message should not exceed 50 characters'],
    },

});

export default mongoose.model("ContactUs", contactSchema);
