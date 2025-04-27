import express from "express";
import connectDB from "./config/db.js";
import methodOverride from "method-override"
import pages from "./routes/pages.js";
import api from "./routes/api.js";
import expressLayouts  from "express-ejs-layouts";
import session from "express-session";
import initializeServices from "./config/initializeServices.js";
import initializeInformation from "./config/initializeInformation.js";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(fileUpload());
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(pages)
app.use(methodOverride('_method'));
app.use("/api", api)
app.set('view engine', 'ejs');
app.use(expressLayouts)

connectDB.then(async () => {
    console.log("DB Connected");

    await initializeInformation();
    await initializeServices();

    app.listen(process.env.PORT || 3000, () => {
        console.log("Server Started")
    })
}).catch((error) => {
    console.log(`Error With Connect DB: ${error.message}`);
})

