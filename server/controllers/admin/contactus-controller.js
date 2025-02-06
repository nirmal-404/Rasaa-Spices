import ContactUs from "../../models/Contact.js"

// Admin fetches all contact forms
export const getAllContactForms = async (req, res) => {
    try {
        const contactUsList = await ContactUs.find({ });

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

// Admin deletes a specific contact form
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
