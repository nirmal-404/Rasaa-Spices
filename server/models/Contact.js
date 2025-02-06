import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^\+94[\d\s\-]{7,15}$/, 'Please enter a valid Sri Lankan phone number starting with +94'],
    },
    inquiryType: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },

}, { timestamps: true });

export default mongoose.model("ContactUs", contactSchema);
