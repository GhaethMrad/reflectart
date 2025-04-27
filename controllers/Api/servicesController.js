import ServicesModel from "../../models/Services.model.js";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

export const getServices = async (req, res) => {
    try {
        const services = await ServicesModel.find().sort({_id: 1});
        res.status(200).json(services)
    } catch(error) {
        res.json({message: error.message})
    }
}

export const editService = async (req, res) => {
    try {
        const service = await ServicesModel.findByIdAndUpdate(req.params.id);
        service.title = req.body.title;
        service.desc = req.body.desc;

        if (req.files?.image) {
            const img = req.files.image;

            if (service.image) {
                const oldImagePath = path.join(__dirname, 'public', service.image);
                if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
                }
            }

            const uploadDir = path.join(__dirname, 'public', 'uploads', 'services');

            const filename = `${Date.now()}_${img.name}`;
            const filePath = path.join(uploadDir, filename);

            await img.mv(filePath);

            service.image = `/uploads/services/${filename}`
        } else {
            service.image = service.image;
        }

        await service.save();
        res.status(200).redirect("/services?success=true")
    } catch(error) {
        res.status(404).redirect("/services?error")
    }
}