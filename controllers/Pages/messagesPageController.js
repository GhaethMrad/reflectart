import MessageModel from "../../models/Message.model.js";

export const allMessages = async (req, res) => {
    try {
        const messages = await MessageModel.find();
        res.render("layout.ejs", {
            title: "Messages",
            page: "pages/messages/messages.ejs",
            pageName: "Messages",
            messages
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}
