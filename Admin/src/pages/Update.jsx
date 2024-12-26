import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import "./Update.css";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import imgup3 from "../assets/imgup3.png";
const Update = () => {
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/category/list");
      if (response.data.success) {
        setCategories(response.data.categories);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const paginationModel = { page: 0, pageSize: 5 };

  const handleCategoryChange = async (id, newCategoryId) => {
    // Update the list state locally
    const updatedList = list.map((product) =>
      product._id === id ? { ...product, category: newCategoryId } : product
    );
    setList(updatedList);
  };

  const fetchCategoryName = async (categoryId) => {
    try {
      const response = await axios.get(
        backendUrl + `/api/category/single/${categoryId}`
      );
      if (response.data.success) {
        return response.data.category;
      } else {
        toast.error(response.data.message);
        return categoryId;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      return categoryId;
    }
  };
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      console.log(response.data.products);
      if (response.data.success) {
        const products = response.data.products;
        const updatedProducts = await Promise.all(
          products.map(async (product) => {
            const categoryName = await fetchCategoryName(product.category);
            return { ...product, category: categoryName };
          })
        );
        setList(updatedProducts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchList();
  }, []);
  const columns = [
    { field: "name", headerName: "Product Name", width: 130, editable: true },
    { field: "brand", headerName: "Brand", width: 90, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 180,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      editable: true,
      width: 70,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      editable: true,
      width: 70,
    },
    {
      field: "category",
      headerName: "Category",
      editable: true,
      width: 140,
      renderEditCell: (params) => (
        <select
          value={params.value || ""}
          onChange={(e) => handleCategoryChange(params.row.id, e.target.value)}
          style={{ width: "100%", height: "100%" }}
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      ),
    },
    {
      field: "image1",
      headerName: "Image 1",
      editable: false,
      sortable: false,
      width: 160,
      renderCell: (params) =>
        params.value ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src={params.value}
              alt="Image 3"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src={imgup3}
              alt="Image 3"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ),
    },
    {
      field: "image2",
      headerName: "Image 2",
      editable: false,
      sortable: false,
      width: 160,
      renderCell: (params) =>
        params.value ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src={params.value}
              alt="Image 3"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src={imgup3}
              alt="Image 3"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ),
    },
    {
      field: "image3",
      headerName: "Image 3",
      editable: false,
      sortable: false,
      width: 160,
      renderCell: (params) =>
        params.value ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src={params.value}
              alt="Image 3"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src={imgup3}
              alt="Image 3"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ),
    },
    {
      field: "image4",
      headerName: "Image 4",
      editable: false,
      sortable: false,
      width: 160,
      renderCell: (params) =>
        params.value ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src={params.value}
              alt="Image 3"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src={imgup3}
              alt="Image 3"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ),
    },
  ];
  const rows = list.map((product, index) => ({
    id: product._id || index,
    name: product.name,
    brand: product.brand,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category,
    image1: product.image[0] || null,
    image2: product.image[1] || null,
    image3: product.image[2] || null,
    image4: product.image[3] || null,
  }));
  return (
    <>
      <p style={{ marginBottom: "3rem" }}>All Products</p>
      <Paper sx={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          rowHeight={150}
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
};

export default Update;
