import Laptop from "../assets/LaptopMain.jpg";
import Mobile from "../assets/MP.png";
import Camera from "../assets/CameraMain.jpg";
import Tab from "../assets/TabletMain.jpeg";
import HeadPhone from "../assets/HeadPhone.jpeg";

import TV from "../assets/TV.jpg";
import GameConsole from "../assets/GameConsole.jpg";
import React, { useState, useEffect, useContext } from "react";
import "./Home.css"; // Add this CSS file for styling
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { backendUrl } from "../App";
import ProductItem from "../components/ProductItem";
const Home = () => {
  const images = [
    Laptop,
    Mobile,
    Camera,
    Tab,
    HeadPhone,
    TV,
    GameConsole, // Add your image paths here
  ];
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const shuffleArray = (array) => {
    let shuffledArray = [...array]; // Make a copy of the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]; // Swap elements
    }
    return shuffledArray;
  };

  const [categories, setCategories] = useState([]);
  const { productList } = useContext(ShopContext);

  useEffect(() => {
    const shuffledProducts = shuffleArray(productList).slice(0, 10);
    setFeaturedProducts(shuffledProducts);
  }, [productList]);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/category/list");
      if (response.data.success) {
        setCategories(response.data.categories);
        console.log(response.data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  // useEffect(() => {
  //   fetchCategories();
  // }, []);
  // const { productList } = useContext(ShopContext); // Access the product list from context

  return (
    <div>
      <div className="slideshow-container">
        <div
          className="slideshow"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="slide"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ))}
        </div>
      </div>
      {/* Featured Products Section */}
      <div className="featured-products-container">
        <h2 className="featured-products-heading">Featured Products</h2>
        <div className="featured-products-grid">
          {featuredProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const getRandomColor = (index) => {
  const colors = ["#FFD700", "#FFA07A", "#87CEFA", "#90EE90", "#FFB6C1"];
  return colors[index % colors.length];
};

export default Home;
