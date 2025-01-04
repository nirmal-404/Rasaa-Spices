import Contact from '../../models/Contact.js'


export const addContactUs = async (req, res) => {
    try {

        const { email, phone, type, message } = req.body;

        if (!email || !phone || !type || !message) {

            return res.status(400).json({ status: "error", message: "All fields are required..." });
        }

        const newContact = await Contact.create({ email, phone, type, message });
        return res.status(200).json({
            status: "success",
            message: "Your message was successfully placed.",
            data: newContact,
        });



    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ status: "error", message: error.message });
    }
}

export const getContacts = async (req, res) => {
    try {

        const existContact = await Contact.find();

        if (!existContact.length) {
            return res.status(400).json({ message: 'Contacts not found...' });
        }
        return res.status(200).json({ status: "success", message: "Contacts fetch succesfully...", data: existContact });


    } catch (error) {
        return res.status(500).json({ errorMessage: error.message });
    }
}


export const getContact = async (req, res) => {
    try {

        const cid = req.params.id;

        if (!cid) {
            return res.status(400).json({ status: "error", message: "Contact not found..." });
        }

        const contactData = await Contact.findById(cid);

        if (!contactData) {
            return res.status(404).json({ status: "error", message: "Something went  wrong..." })
        }

        return res.status(200).json({ status: "success", message: "Contact found", data: contactData });

    } catch (error) {
        return res.status(500).json({ errorMessage: error.message });
    }

}


export const deleteContact = async (req, res) => {
    try {

        console.log("here....")
        const cid = req.params.id;

        const deletedcontact = await Contact.findByIdAndDelete(cid);
        res.status(200).json({ status: 'success', message: "Contact Deleted Succesfully...", data: deletedcontact });

    } catch (error) {
        return res.status(500).json({ errorMessage: error.message });
    }
};


export const updateContact = async (req, res) => {
    try {
        const cid = req.params.id;
        const ContactExist = await Contact.findById(cid);

        if (!ContactExist) {
            return res.status(404).json({ message: "Contact Is Not Found..." });
        }

        const updatedContact = await Contact.findByIdAndUpdate(cid, req.body, {
            new: true
        })

        res.status(200).json({ message: "Update Conatct Succesfully...", data: updatedContact });





    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};