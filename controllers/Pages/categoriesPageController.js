import CategoriesModel from "../../models/Categories.model.js";

export const categories = async (req, res) => {
  res.render("layout.ejs", {
    page: "pages/categories/categories.ejs",
    title: "Categories",
    pageName: "Categories Page",
    data: await CategoriesModel.find(),
    searchQuery: "",
  });
};

export const addCategory = async (req, res) => {
  res.render("layout.ejs", {
    page: "pages/categories/addCategory.ejs",
    title: `Add Category`,
    pageName: `Add Category Page`,
  });
};

export const editCategory = async (req, res) => {
  res.render("layout.ejs", {
    page: "pages/categories/editCategory.ejs",
    title: `Edit Category<${req.params.id}>`,
    pageName: `Edit Category<${req.params.id}>`,
    data: await CategoriesModel.findById(req.params.id),
  });
};
