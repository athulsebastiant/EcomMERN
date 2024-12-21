import Category from "../models/categoryModel.js";

const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const categoryData = {
      name,

      description,
    };

    console.log(categoryData);
    const category = new Category(categoryData);
    await category.save();

    res.json({ success: true, message: "Category added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const removeCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Category removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const listCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    res.json({ success: true, categories });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedCategory)
      return res.status(404).json({ message: "Category not found" });

    res.json({ success: true, updatedCategory });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

export { addCategory, removeCategory, listCategories, updateCategory };
