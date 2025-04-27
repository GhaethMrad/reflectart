import ProjectsModel from "../../models/Projects.model.js";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

export const getAllProjects = async (req, res) => {
    const projects = await ProjectsModel.find()

    try {
        if (!projects) {
            return res.status(404).json({message: "Projects Not Found"})
        }
        res.status(200).json(projects)
    } catch (error) {
        res.json({message: error.message});
    }
}
export const getProjectByTitle = async (req, res) => {
    try {
        const searchQuery = req.query.title;
                
        const data = await ProjectsModel.find({
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
            ]
        });
        
        res.status(200).render("layout.ejs", {
            page: "pages/projects/projects.ejs",
            title: "Projects",
            pageName: "All Projects Page",
            searchQuery,
            data
        })
    } catch (error) {
        res.status(500).send('حدث خطأ أثناء البحث');
    }
}

export const addNewProject = async (req, res) => {
    const project = new ProjectsModel();
    const projects = await ProjectsModel.find();
    let istrue = true;
    let imageId = projects.length > 0 ? (projects[projects.length - 1].images[projects[projects.length - 1].images.length - 1].id) : 1;

    try {
        projects.forEach((project) => {
            if (req.body.title == project.title) {
                istrue = false;
                return;
            } else {
                istrue = true;
            }
        })
        if (istrue) {
            project.title = req.body.title;
        } else {
            return res.redirect("/projects/add?title")
        }
        project._id = projects.length + 1;

        let images = [];
        const img = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
        const uploadDir = path.join(__dirname, 'public', 'uploads', 'projects');

        img.forEach(async (img) => {
            const filename = `${Date.now()}_${img.name}`;
            const filePath = path.join(uploadDir, filename);

            images.push({id: ++imageId, url: `/uploads/projects/${filename}`})

            await img.mv(filePath);
        })
        project.images = images;

        await project.save();
        res.status(201).redirect("/projects?success=true");
    } catch(error) {
        res.status(500).redirect("/projects?error=" + encodeURIComponent(error.message));
    }
}

export const addProjectImages = async (req, res) => {
    const project = await ProjectsModel.findById(req.params.id);
    const projects = await ProjectsModel.find();
    let imageId = projects.length > 0 && project.images.length > 0 ? (projects[projects.length - 1].images[projects[projects.length - 1].images.length - 1].id) : 1;

    try {
        const img = (req.files.images.length > 0) ? [...req.files.images] : [req.files.images];

        const uploadDir = path.join(__dirname, "public", "uploads", "projects")

        img.forEach(async (image) => {
            const filename = `${Date.now()}_${image.name}`;
            const filePath = path.join(uploadDir, filename);

            project.images.push({id: ++imageId, url: `/uploads/projects/${filename}`})

            await image.mv(filePath)
        })
        await project.save();
        res.status(201).redirect(`/projects/${project._id}/images?success`)
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteProject = async (req, res) => {
    const id = req.params.id.toString();
    const project = await ProjectsModel.findById(id)

    try {
        if (project.images.length > 0) {
            project.images.forEach((image) => {
                const oldImagePath = path.join(__dirname, 'public', image.url)
                console.log(oldImagePath)
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            })
        }
        await ProjectsModel.deleteOne({ _id: id });
        res.status(200).redirect("/projects?deleted=true")
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
}

export const deleteProjectImage = async (req, res) => {
    const imageId = req.query.id;
    const project = await ProjectsModel.findById(req.params.id);

    try {
        const img = project.images.filter((image) => {
            return image.id == imageId
        })
        img.forEach((image) => {
            const imagePath = path.join(__dirname, "public", image.url)
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        })
        project.images = project.images.filter((image) => {
            return image.id != imageId
        })
        await project.save();
        res.status(200).redirect(`/projects/${project._id}/images?deleted`)
    } catch (error) {
        res.json({message: error.message})
    }
}