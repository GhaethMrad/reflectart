import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    title: {type: String, required: true},
    images: {type: Array, required: true}
})

export default mongoose.model("categorie", categoriesSchema)