import mongoose from "mongoose";

const informationSchema = new mongoose.Schema({
    _id: {type: String, required: true, unique: true},
    aboutDesc: {type: String, required: true},
    teamDesc: {type: String, required: true},
    servicesDesc: {type: String, required: true},
    email: {type: String, required: true},
    mobile: {type: String, required: true},
    facebookAndInstagram: {type: String, required: true},
    websiteURL: {type: String, required: true},
})

export default mongoose.model("information", informationSchema);