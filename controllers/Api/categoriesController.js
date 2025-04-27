import CategoriesModel from "../../models/Categories.model.js"
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

export const getCategories = async (req, res) => {
    const categories = await CategoriesModel.find();
    if (categories.length == 0) {
        return res.status(404).json({message: "Not Found"})
    }
    res.status(200).json(categories)
}

export const getCategoryByTitle = async (req, res) => {
    try {
        const searchQuery = req.query.title;
        
        const data = await CategoriesModel.find({
          $or: [
            { title: { $regex: searchQuery, $options: 'i' } },
          ]
        });
    
        res.status(200).render('layout.ejs', {
          title: "Categories", 
          page: "pages/categories/categories.ejs",
          pageName: "Categories Page",
          data,
          searchQuery
        });
        
      } catch (error) {
        res.status(500).send('حدث خطأ أثناء البحث');
      }
}

export const addCategory = async (req, res) => {
    const category = new CategoriesModel();
    const categories = await CategoriesModel.find();
    let isTrue = true;

    for (let i = 0; i < categories.length; i++) {
        if (categories[i].title == req.body.title) {
            isTrue = false;
            break;
        } else {
            isTrue = true
        }
    }

    if (isTrue) {
        let imageId = categories.length > 0 ? (categories[categories.length - 1].images[categories[categories.length - 1].images.length - 1].id) : 1;

        try {
            category.title = req.body.title;
            category._id = categories.length > 0 ? +(categories[categories.length - 1]._id) + 1 : 1

            if (Array.from(req.files.images).length < 3 || Array.from(req.files.images).length > 3) {
                return res.redirect("/categories/add?error");
            }
            let images = [];
            const img = req.files.images;
            
            const uploadDir = path.join(__dirname, 'public', 'uploads', 'categories');

            img.forEach(async (img) => {
                const filename = `${Date.now()}_${img.name}`;
                const filePath = path.join(uploadDir, filename);

                images.push({id: ++imageId, url: `/uploads/categories/${filename}`})

                await img.mv(filePath);
            })
            category.images = images
            
            await category.save();
            res.status(201).redirect("/categories?success=true");
        } catch(error) {
            res.json({message: error.message})
        }
    } else {
        res.redirect("/categories/add?false")
    }
}

export const editCategory = async (req, res) => {
    const category = await CategoriesModel.findById(req.params.id);
    const categories = await CategoriesModel.find();
    let isTrue = true;

    try {
        if (req.body.title.trim() == "") {
            return res.redirect(`/categories/${req.params.id}?titleUndefinde`);
        } else {
            const filterCategories = categories.filter((cate) => {
                return cate._id != category._id;
            })
            for (let i = 0; i < filterCategories.length; i++) {
                if (req.body.title == filterCategories[i].title) {
                    isTrue = false;
                    break;
                } else {
                    isTrue = true;
                }
            }
            if (isTrue) {
                category.title = req.body.title;
            } else {
                return res.redirect(`/categories/${req.params.id}?titleclone`);
            }
        }
        if (!req.files?.images) {
            category.images = category.images;
        } else {
            if (req.files.images.length < 3 || req.files.images.length > 3) {
                return res.redirect(`/categories/${req.params.id}?images`);
            } else {
                const uploadDir = path.join(__dirname, 'public', 'uploads', 'categories');
                const img = req.files.images;
                const images = [];


                category.images.forEach((image, index) => {
                    const oldImagePath = path.join(__dirname, 'public', image.url);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                })
                img.forEach(async (img) => {
                    const filename = `${Date.now()}_${img.name}`;
                    const filePath = path.join(uploadDir, filename);
    
                    images.push({id: img.id, url: `/uploads/categories/${filename}`})
    
                    await img.mv(filePath);
                })
                category.images = images
            }
        }
        await category.save()
        res.redirect(`/categories?true`)
    } catch (error) {
        res.json({message: error.message});
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id.toString();
        
        const category = await CategoriesModel.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: `The Category<${categoryId}> Not Found` });
        }

        category.images.forEach((image) => {
            const oldImagePath = path.join(__dirname, 'public', image.url);
            
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        });

        // حذف الفئة من قاعدة البيانات بعد معالجة الصور
        await CategoriesModel.deleteOne({ _id: categoryId });

        res.status(200).redirect("/categories?deleted=true");

    } catch(error) {
        console.error('Error deleting category:', error.message);
        res.status(500).redirect("/categories?notDeleted");
    }
}