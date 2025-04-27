import InformationModel from "../../models/information.model.js";


export const publicInformation = async (req, res) => {
  res.render("layout.ejs", {
    page: "pages/publicInformation/publicInformation.ejs",
    title: "Public Information",
    pageName: "Public information page",
    data: await InformationModel.findById("1"),
  });
};