import React from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./AllProducts.css";
const AllProducts = () => {
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      console.log(backendUrl);
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

  useEffect(() => {
    fetchList();
    fetchCategories();
  }, []);
  useEffect(() => {
    setFilterProducts(list); // Update filtered products when `list` changes
  }, [list]);

  return (
    <div className="AllPMDiv">
      <div className="forFilter">
        <p className="pText">FILTERS</p>

        {/*Category Filter*/}
        <div className={`categoryFil`}>
          <p className="catText">CATEGORIES</p>
          <div className="divInCatText">
            <p className="pInCatText">
              <input type="checkbox" style={{ width: "0.75rem" }} value={""} />{" "}
              Cat 1
            </p>
            <p className="pInCatText">
              <input type="checkbox" style={{ width: "0.75rem" }} value={""} />{" "}
              Cat 2
            </p>
            <p className="pInCatText">
              <input type="checkbox" style={{ width: "0.75rem" }} value={""} />{" "}
              Cat 3
            </p>
          </div>
        </div>
        {/*SubCategory Filter*/}
        <div className={`categoryFil`}>
          <p className="catText">BRANDS</p>
          <div className="divInCatText">
            <p className="pInCatText">
              <input type="checkbox" style={{ width: "0.75rem" }} /> Brand 1
            </p>
            <p className="pInCatText">
              <input type="checkbox" style={{ width: "0.75rem" }} /> Brand 2
            </p>
            <p className="pInCatText">
              <input type="checkbox" style={{ width: "0.75rem" }} /> Brand 3
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="rightDiv">
        <h2>ALL COLLECTIONS</h2>
        <select className="sortSel">
          <option value="Relevant">Sort by: Relevant</option>
          <option value="Low-High">Sort by: Low-High</option>
          <option value="High-Low">Sort by: High-Low</option>
        </select>
        {/* Map Products */}
        <div className="forProds"></div>
      </div>
    </div>
  );
};

export default AllProducts;
