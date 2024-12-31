import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import "./Update.css";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import imgup3 from "../assets/imgup3.png";
import Button from "@mui/material/Button";
import { Select, MenuItem } from "@mui/material";
const Update = ({ token }) => {
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editedRow, setEditedRow] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  // const fetchCategories = async () => {
  //   try {
  //     const response = await axios.get(backendUrl + "/api/category/list");
  //     if (response.data.success) {
  //       setCategories(response.data.categories);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message);
  //   }
  // };

  const paginationModel = { page: 0, pageSize: 5 };

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
      if (response.data.success) {
        const products = response.data.products;
        // First get all categories for lookup
        const categoriesResponse = await axios.get(
          backendUrl + "/api/category/list"
        );
        const categoriesList = categoriesResponse.data.success
          ? categoriesResponse.data.categories
          : [];

        // Map products with full category objects
        const updatedProducts = products.map((product) => {
          const categoryObject = categoriesList.find(
            (cat) => cat.name === product.category
          );
          return {
            ...product,
            category: categoryObject || product.category, // fallback to original if not found
          };
        });

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

  const fetchCategories = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/category/list");
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const CategoryEditCell = (props) => {
    const { id, value, field, api } = props;

    const handleChange = (event) => {
      const selectedCategory = categories.find(
        (cat) => cat._id === event.target.value
      );
      api.setEditCellValue({ id, field, value: selectedCategory?._id });
      api.stopCellEditMode({ id, field });
    };

    return (
      <select value={value || ""} onChange={handleChange}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    );
  };
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
      renderEditCell: (params) => <CategoryEditCell {...params} />,
      renderCell: (params) => {
        const value = params.value;
        // If it's a category object
        if (value && typeof value === "object") {
          return value.name;
        }
        // If it's just a string (category name)
        if (typeof value === "string") {
          const category = categories.find((cat) => cat.name === value);
          return category ? category.name : value;
        }
        return "";
      },
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

  const handleCellEditCommit = (params) => {
    console.log("handleCellEditCommit called with:", params);

    const { id, field, value } = params;

    if (!id || !field) {
      console.error("Invalid parameters in handleCellEditCommit:", params);
      return;
    }

    if (editedRow && editedRow !== id) {
      toast.error("Only one row can be edited at a time");
      return;
    }

    setEditedRow(id); // Track the edited row

    setEditedFields((prevFields) => {
      const updatedFields = {
        ...prevFields,
        [id]: {
          ...prevFields[id], // Retain existing changes for this row
          [field]: value, // Update the specific field
        },
      };
      console.log("Updated editedFields:", updatedFields);
      return updatedFields;
    });

    setList((prevList) =>
      prevList.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };
  const handleSaveButtonClick = async () => {
    console.log("Saving changes...");
    console.log("EditedRow:", editedRow);
    console.log("EditedFields:", editedFields);

    if (!editedRow || !editedFields[editedRow]) {
      toast.error("No changes to save");
      return;
    }

    try {
      const changes = editedFields[editedRow];
      console.log("Saving changes for row:", { editedRow, changes });

      const response = await axios.patch(
        `${backendUrl}/api/product/update/${editedRow}`,
        changes,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Changes saved successfully!");
        fetchList(); // Refresh the data
        setEditedRow(null); // Clear edited row
        setEditedFields({}); // Reset changes
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during save:", error);
      toast.error(error.message || "An error occurred while saving");
    }
  };

  return (
    <>
      <p style={{ marginBottom: "1.5rem" }}>All Products</p>
      <Button
        variant="contained"
        sx={{ marginBottom: "1rem" }}
        onClick={handleSaveButtonClick}
      >
        Save
      </Button>
      <Paper sx={{ height: 550, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          processRowUpdate={(newRow, oldRow) => {
            console.log("Row update:", newRow, oldRow);
            const { id, ...fields } = newRow;

            // Get the first 5 field names (columns)
            const fieldKeys = Object.keys(fields).slice(0, 6);

            // Process each changed field
            fieldKeys.forEach((field) => {
              if (newRow[field] !== oldRow[field]) {
                handleCellEditCommit({
                  id,
                  field,
                  value: newRow[field],
                });
              }
            });

            return newRow;
          }}
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
