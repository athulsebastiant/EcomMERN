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

export { addCategory };
