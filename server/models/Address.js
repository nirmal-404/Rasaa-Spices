import mongoose from "mongoose"

const AddressSchema = new mongoose.Schema(
    {
        userId: String,
        phone: {
            type: String,
            required: true,
            match: [/^\+\d{1,4}[\d\s\-]{7,15}$/, 'Please enter a valid phone number starting with +'],

        },
        address: String,
        city: String,
        postalcode: String,
        notes: String,
    },
    { timestamps: true }
);

export default mongoose.model("Address", AddressSchema);