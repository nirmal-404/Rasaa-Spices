import User from '../models/userModels.js'

export const addUser = async(req,res)=> {

    try{
        console.log("Body:", req.body); 
        console.log("File:", req.file);

        const {firstName,lastName,address,email,gender} = req.body;
        const image = req?.file?.filename;

        if(!firstName || !lastName || ! address || !email || !gender) {
            return res.status(400).json({status: "error", message: "All fields are required..."});
        }

        
        const existUser = await User.findOne({email});

        if(existUser) {
            return res.status(400).json({status: "error", message: "This email already using by other user..."});
        }

        const newUser = await User.create({firstName,lastName,address,email,gender,image});

        return res.status(200).json({status: "success", message: "New user is created successfully..."});

    }catch(error) {
        console.error("Error:", error.message);
        return res.status(500).json({status: "error", message: error.message});
    }
    
};

export const getUsers = async(req,res)=> {
    try{

        const existUser = await User.find();

        if(!existUser.length) {
            return res.status(400).json({message: 'user not found...'});
        }
        return res.status(200).json({status: "success", message: "Users fetch succesfully...", data: existUser});


    }catch(error){
        return res.status(500).json({errorMessage:error.message}); 
    }
}

export const getuser = async(req,res)=> {
    try{

        const uid = req.params.id;

        if(!uid) {
            return res.status(400).json({status: "error", message: "User not found..."});
        }

        const userData = await User.findById(uid);

        if(!userData) {
            return res.status(404).json({status: "error", message: "Something went  wrong..."})
        }

        return res.status(200).json({status: "success", message: "User found", data: userData});

    }catch(error){
        return res.status(500).json({errorMessage:error.message}); 
    }

}

export const updateUser = async(req,res)=> {
    try{
        const uid = req.params.id;
        const userExist = await User.findById(uid);

        if(!userExist) {
            return res.status(404).json({message: "User Is Not Found..."});
        }

        const updatedUser =await User.findByIdAndUpdate(uid,req.body, {
                new: true
        })

        res.status(200).json({message: "Update User Succesfully...",data: updatedUser});



        

    }catch(error) {
        res.status(500).json({errorMessage:error.message});
    }
};


export const deleteUser = async(req,res)=> {
    try{
        const uid = req.params.id;

        const deletedUser = await User.findByIdAndDelete(uid);
        res.status(200).json({message: "User Deleted Succesfully...",data: deletedUser});

    }catch(error){
        return res.status(500).json({errorMessage:error.message}); 
    }
};