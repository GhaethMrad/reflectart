import InformationModel from "../models/PublicInformation.model.js";

const initializeInformation = async () => {
  try {
    const count = await InformationModel.countDocuments();

    if (count === 0) {
      await InformationModel.create([
        {
          _id: "1",
          aboutDesc: "asdasdas",
          teamDesc: "asdasdasd",
          servicesDesc: "asdasd",
          email: "ghaeth@gmail.com",
          mobile: "0932365733",
          facebookAndInstagram: "refelectart.a",
          websiteURL: "https://reflectart.net",
        },
      ]);
    }
    console.log("✅ Initial information created successfully");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default initializeInformation;
