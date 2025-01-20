import mongoose from "mongoose"

const AddressSchema = new mongoose.Schema(
    {
        userId: String,
        address: String,
        city: String,
        postalcode: String,
        phone: String,
        notes: String,
    },
    { timestamps: true }
);

export default mongoose.model("Address", AddressSchema);