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

const singleCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Validate categoryId
    if (!categoryId) {
      return res
        .status(400)
        .json({ success: false, message: "Category ID is required" });
    }

    const category = await Category.findById(categoryId);

    // Check if category exists
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, category: category.name });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export {
  addCategory,
  removeCategory,
  listCategories,
  updateCategory,
  singleCategory,
};
