import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const { name, brand, description, price, stock, category } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        console.log(result);
        return result.secure_url;
      })
    );
    console.log(imagesUrl);
    const productData = {
      name,
      brand,
      description,
      price,
      image: imagesUrl,
      stock,
      category,
    };

    // console.log(name, brand, description, price, stock);

    // console.log(imagesUrl);

    console.log(productData);
    const product = new Product(productData);
    await product.save();

    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updateProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json({ success: true, updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.body;

    // Input validation
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    // Find all products matching the category
    const products = await Product.find({ category });

    // If no products found
    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found in this category",
      });
    }

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

const getUniqueBrands = async (req, res) => {
  try {
    // Use Mongoose's distinct method to fetch unique brand names
    const uniqueBrands = await Product.distinct("brand");
    res.status(200).json({
      success: true,
      brands: uniqueBrands,
    });
  } catch (error) {
    console.error("Error fetching unique brands:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch unique brands",
      error: error.message,
    });
  }
};
export {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  updateProduct,
  getProductsByCategory,
  getUniqueBrands,
};
