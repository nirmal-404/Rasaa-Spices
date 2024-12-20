import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        match: [/^\+\d{1,4}[\d\s\-]{7,15}$/, 'Please enter a valid Sri Lankan phone number starting with +94'], 

    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
        
    },
    image: {
        type: String,
        required: true
    }
})

export default mongoose.model("User",userSchema);