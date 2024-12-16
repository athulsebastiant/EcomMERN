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

const listProducts = async (req, res) => {};

const removeProduct = async (req, res) => {};

const singleProduct = async (req, res) => {};

export { listProducts, addProduct, removeProduct, singleProduct };
