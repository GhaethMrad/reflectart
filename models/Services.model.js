import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema({
    _id: {type: String, unique: true },
    title: {type: String, required: true},
    desc: {type: String, required: true},
    image: {type: String, required: true},
})

export default mongoose.model("services", servicesSchema)