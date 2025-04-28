import InformationModel from "../../models/PublicInformation.model.js";

export const getInformation = async (req, res) => {
  const getAllinformation = await InformationModel.find();
  try {
    if (!getAllinformation) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.status(200).json(getAllinformation);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editInformation = async (req, res) => {
  const addInformation = await InformationModel.findByIdAndUpdate("1");
  try {
    addInformation.id = "1";
    addInformation.aboutDesc = req.body.aboutDesc;
    addInformation.teamDesc = req.body.teamDesc;
    addInformation.servicesDesc = req.body.servicesDesc;
    addInformation.email = req.body.email;
    addInformation.mobile = req.body.mobile;
    addInformation.facebookAndInstagram = req.body.facebookAndInstagram;
    addInformation.websiteURL = req.body.websiteURL;

    await addInformation.save();

    res.redirect("/information?success=true");
  } catch (error) {
    console.log(error);
    res.redirect("/information?error");
  }
};
