import express from "express";
import { index, login } from "../controllers/Pages/indexPageControllers.js";
import { publicInformation } from "../controllers/Pages/informationPageController.js";
import { allServices, editService } from "../controllers/Pages/servicesPageController.js";
import { addCategory, categories, editCategory } from "../controllers/Pages/categoriesPageController.js";
import { addProject, allProjects, projectImages } from "../controllers/Pages/projectsPageController.js";
import { isAdmin, redirectIfAdmin } from "../middlewares/login.js";
import { allMessages } from "../controllers/Pages/messagesPageController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/login", redirectIfAdmin, login);

router.get("/dashboard", isAdmin, index);

router.get("/information", publicInformation);

router.get("/services", allServices);

router.get("/services/:id", editService);

router.get("/categories", categories);

router.get("/categories/add", addCategory);

router.get("/categories/:id", editCategory);

router.get("/projects", allProjects);

router.get("/projects/:id/images", projectImages)

router.get("/projects/add", addProject)

router.get("/messages", allMessages);

export default router;
