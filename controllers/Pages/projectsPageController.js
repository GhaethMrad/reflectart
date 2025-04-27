import ProjectsModel from "../../models/Projects.model.js"

export const allProjects = async (req, res) => {
    res.render("layout.ejs", {
        page: "pages/projects/projects.ejs",
        title: "Projects",
        pageName: "All Projects Page",
        data: await ProjectsModel.find(),
        searchQuery: "",
    })
}

export const projectImages = async (req, res) => {
    res.render("layout.ejs", {
        page: "pages/projects/projectImages.ejs",
        title: `Project<${req.params.id}> Images`,
        pageName: `Project<${req.params.id}> Images`,
        data: await ProjectsModel.findById(req.params.id)
    })
}

export const addProject = (req, res) => {
    res.render("layout.ejs", {
        page: "pages/projects/addProject.ejs",
        title: "Add Project",
        pageName: "Add New Project"
    })
}