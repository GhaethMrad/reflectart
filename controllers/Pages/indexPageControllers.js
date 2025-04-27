import CategoriesModel from "../../models/Categories.model.js";
import ProjectsModel from "../../models/Projects.model.js";
import ServicesModel from "../../models/Services.model.js";

export const login = (req, res) => {
  res.render("pages/login.ejs");
};

export const index = async (req, res) => {
  res.render("layout.ejs", {
    page: "pages/index.ejs",
    title: "Dashboard",
    pageName: "Home Page",
    countOfCategories: await CategoriesModel.countDocuments(),
    countProjects: await ProjectsModel.countDocuments(),
    countServices: await ServicesModel.countDocuments()
  });
};
