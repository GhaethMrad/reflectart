import MessageModel from "../../models/Message.model.js";

export const addMessage = async (req, res) => {
    try {
        const {name, email, message} = req.body;
        const newMessage = new MessageModel({name, email, message});
        await newMessage.save();
        res.status(201).json({message: "Message added successfully"});
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}

export const deleteMessage = async (req, res) => {
    try {
        const {id} = req.params;
        await MessageModel.findByIdAndDelete(id);
        res.status(200).redirect("/messages?deleted=true");
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
}
