import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import "./Product.css";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import Button from "@mui/material/Button";
const Product = () => {
  const { productId } = useParams();
  const [list, setList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(false);
  const [image, setImage] = useState("");
  const { currency, addToCart } = useContext(ShopContext);
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      //console.log(backendUrl);
      if (response.data.success) {
        // Store products with category IDs only
        console.log(response.data.products);
        setList(response.data.products);
        console.log(list);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const fetchProductData = async () => {
    list.map((item) => {
      if (item._id === productId) {
        setSelectedProduct(item);
        console.log(item);
        setImage(item.image[0]);
        console.log(item);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [list]);

  useEffect(() => {
    fetchList();
  }, []);
  return selectedProduct ? (
    <div className="product-gallery-container">
      {/* Thumbnail Images Column */}
      <div className="thumbnail-column">
        {selectedProduct.image.map((item, index) => (
          <div key={index} className="thumbnail-wrapper">
            <img
              onClick={() => setImage(item)}
              src={item}
              alt={`Product thumbnail ${index + 1}`}
              className="thumbnail-image"
            />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="main-image-container">
        <div className="main-image-wrapper">
          <img src={image} alt="Main product view" className="main-image" />
        </div>
      </div>

      {/* Product Info */}
      <div style={{ flex: 1 }}>
        <h1 className="ProHead">{selectedProduct.name}</h1>
        <p
          style={{
            marginTop: "1.25rem",
            fontSize: "1.875rem",
            fontWeight: "500",
          }}
        >
          {currency}
          {selectedProduct.price}
        </p>
        <p class="brand-sticker">{selectedProduct.brand}</p>{" "}
        <p class="stock-info">{selectedProduct.stock}</p>
        <p style={{ marginTop: "1.25rem", color: " #6b7280", width: "80%" }}>
          {selectedProduct.description}
        </p>
        <Button
          onClick={() => addToCart(selectedProduct._id)}
          variant="contained"
          sx={{
            backgroundColor: "#00796b",
            "&:hover": { backgroundColor: "#004d40" },
            color: "#ffffff",
          }}
        >
          ADD TO CART
        </Button>
        <hr style={{ marginTop: "9rem" }} />
      </div>
    </div>
  ) : (
    <div className="noProd"></div>
  );
};

export default Product;
