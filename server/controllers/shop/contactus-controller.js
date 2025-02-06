import ContactUs from "../../models/Contact.js"

// User submits a contact form
export const submitContactForm = async (req, res) => {
    try {
        const { name, email, phoneNumber, inquiryType, message } = req.body;

        if (!name || !email || !phoneNumber || !inquiryType || !message ) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!",
            });
        }

        const newContactUs = new ContactUs({
            name, 
            email, 
            phoneNumber, 
            inquiryType, 
            message
        });

        await newContactUs.save();

        res.status(201).json({
            success: true,
            data: newContactUs,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};

// User fetches all their contact forms by email
export const getUserContactForms = async (req, res) => {
    try {
        const { email } = req.params;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required!",
            });
        }

        const contactUsList = await ContactUs.find({ email });

        res.status(200).json({
            success: true,
            data: contactUsList,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};

// User edits a specific contact form
export const editContactForm = async (req, res) => {
    try {
        const { id } = req.params;
        const formData = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Contact form ID is required!",
            });
        }

        const contactUs = await ContactUs.findOneAndUpdate(
            {
                _id: id,
            },
            formData,
            { new: true }
        );

        if (!contactUs) {
            return res.status(404).json({
                success: false,
                message: "Contact form not found",
            });
        }

        res.status(200).json({
            success: true,
            data: contactUs,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};

// User deletes a specific contact form
export const deleteContactForm = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Contact form ID is required!",
            });
        }

        const contactUs = await ContactUs.findOneAndDelete({ _id: id });

        if (!contactUs) {
            return res.status(404).json({
                success: false,
                message: "Contact form not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Contact form deleted successfully",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};
