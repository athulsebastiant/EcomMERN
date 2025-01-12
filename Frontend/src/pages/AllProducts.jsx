import React, { useContext } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./AllProducts.css";
import ProductItem from "../components/ProductItem";
import { ShopContext } from "../context/ShopContext";
const AllProducts = () => {
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const { search } = useContext(ShopContext);
  const [brands, setBrands] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortType, setSortType] = useState("Relevant");
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

  const fetchBrands = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/get-brands");
      //console.log(backendUrl);
      if (response.data.success) {
        // Store products with category IDs only
        console.log(response.data.brands);
        setBrands(response.data.brands);
        console.log("Brand");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
    fetchCategories();
    fetchBrands();
  }, []);
  useEffect(() => {
    setFilterProducts(list); // Update filtered products when `list` changes
  }, [list]);

  const toggleCategory = (e) => {
    if (selectedCategory.includes(e.target.value)) {
      setSelectedCategory((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    } else {
      setSelectedCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleBrand = (e) => {
    if (selectedBrand.includes(e.target.value)) {
      setSelectedBrand((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    } else {
      setSelectedBrand((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = list.slice();

    if (search) {
      productsCopy = productsCopy.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.brand.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        selectedCategory.includes(item.category)
      );
    }

    if (selectedBrand.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        selectedBrand.includes(item.brand)
      );
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "Low-High":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "High-Low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [selectedCategory, selectedBrand, search]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    console.log(selectedBrand);
  }, [selectedBrand]);
  return (
    <div className="AllPMDiv">
      <div className="forFilter">
        <p className="pText">FILTERS</p>

        {/*Category Filter*/}
        <div className={`categoryFil`}>
          <p className="catText">CATEGORIES</p>
          <div className="divInCatText">
            {categories.map((category) => (
              <p className="pInCatText" key={category._id}>
                <input
                  type="checkbox"
                  style={{ width: "0.75rem" }}
                  value={category._id}
                  onChange={toggleCategory}
                />{" "}
                {category.name}
              </p>
            ))}
          </div>
        </div>
        {/*SubCategory Filter*/}
        <div className={`categoryFil`}>
          <p className="catText">BRANDS</p>
          <div className="divInCatText">
            {brands.map((brand, index) => (
              <p className="pInCatText" key={index}>
                <input
                  type="checkbox"
                  style={{ width: "0.75rem" }}
                  value={brand}
                  onChange={toggleBrand}
                />{" "}
                {brand}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="rightDiv">
        <h2>ALL COLLECTIONS</h2>
        <select
          className="sortSel"
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="Relevant">Sort by: Relevant</option>
          <option value="Low-High">Sort by: Low-High</option>
          <option value="High-Low">Sort by: High-Low</option>
        </select>
        {/* Map Products */}
        <div className="forProds">
          {filterProducts.map((item, index) => (
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

export default AllProducts;
