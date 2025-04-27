import ServicesModel from "../../models/Services.model.js";


export const allServices = async (req, res) => {
  res.render("layout.ejs", {
    page: "pages/services/allServices.ejs",
    title: "Services",
    pageName: "Services Page",
    data: await ServicesModel.find().sort({ _id: 1 }),
  });
};

export const editService = async (req, res) => {
  res.render("layout.ejs", {
    page: "pages/services/editService.ejs",
    title: `Edit Service<${req.params.id}>`,
    pageName: `Edit Service<${req.params.id}>`,
    data: await ServicesModel.findById(req.params.id),
  });
};