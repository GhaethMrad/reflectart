import express from "express";
import { login } from "../controllers/Api/userController.js";
import { editInformation, getInformation } from "../controllers/Api/informationController.js";
import { editService, getServices } from "../controllers/Api/servicesController.js";
import { addCategory, deleteCategory, editCategory, getCategories, getCategoryByTitle } from "../controllers/Api/categoriesController.js";
import { addNewProject, addProjectImages, deleteProject, deleteProjectImage, getAllProjects, getProjectByTitle } from "../controllers/Api/projectsController.js";
import { addMessage, deleteMessage } from "../controllers/Api/messagesController.js";

const router = express.Router();

//  <Start Login>  //
router.post("/", login)
//  <End Login>  //

//  <Start Public Information>  //
router.get("/information", getInformation)
router.put("/information", editInformation)
//  <End Public Information>  //

//  <Start Services>  //
router.get("/services", getServices)
router.put("/services/:id", editService)
//  <End Services>  //

//  <Start Categories>  //
router.get("/categories", getCategories)
router.get("/categories/search", getCategoryByTitle)
router.post("/categories", addCategory)
router.put("/categories/edit/:id", editCategory)
router.delete("/categories/:id", deleteCategory)
//  <End Categories>  //

//  <Start Projects>  //
router.get("/projects", getAllProjects)
router.get("/projects/search", getProjectByTitle)
router.post("/projects", addNewProject)
router.put("/projects/:id", addProjectImages)
router.delete("/projects/:id", deleteProject)
router.delete("/projects/image/:id", deleteProjectImage)
//  <End Projects>  //

//  <Start Messages>  //
router.post("/messages", addMessage)
router.delete("/messages/:id", deleteMessage)
//  <End Messages>  //

export default router;