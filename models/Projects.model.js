import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    title: {type: String, required: true},
    images: {type: Array, required: true}
})

export default mongoose.model("project", ProjectSchema)