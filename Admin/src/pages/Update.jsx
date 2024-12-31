import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import "./Update.css";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import imgup3 from "../assets/imgup3.png";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { Select, MenuItem } from "@mui/material";
const useStyles = makeStyles({ editedCell: { backgroundColor: "#ffcccb" } });
const Update = ({ token }) => {
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [rows, setRows] = useState([]);
  const [editedRow, setEditedRow] = useState(null);
  const [editedFields, setEditedFields] = useState({});

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
        // Store products with category IDs only
        setList(response.data.products);
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
      api.setEditCellValue({ id, field, value: event.target.value });
      api.stopCellEditMode({ id, field });
    };

    return (
      <Select
        labelId="category-select-label"
        id="category-select"
        value={value || ""}
        label="Select Category"
        sx={{ width: 300 }}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {categories.map((category) => (
          <MenuItem key={category._id} value={category._id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
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
  useEffect(() => {
    const createRows = async () => {
      const categoryNamesPromises = list.map((product) =>
        fetchCategoryName(product.category)
      );
      const categoryNames = await Promise.all(categoryNamesPromises);
      const updatedRows = list.map((product, index) => ({
        id: product._id || index,
        name: product.name,
        brand: product.brand,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: categoryNames[index],
        image1: product.image[0] || null,
        image2: product.image[1] || null,
        image3: product.image[2] || null,
        image4: product.image[3] || null,
      }));
      setRows(updatedRows);
    };
    if (list.length > 0) {
      createRows();
    }
  }, [list]);

  const handleCellEditCommit = (params) => {
    const { id, field, value } = params;
    if (!id || !field) {
      console.error("Invalid parameters in handleCellEditCommit:", params);
      return;
    }
    setEditedRow(id);
    setEditedFields((prevFields) => {
      const updatedFields = {
        ...prevFields,
        [id]: { ...prevFields[id], [field]: value },
      };
      return updatedFields;
    });
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleProcessRowUpdate = (newRow, oldRow) => {
    const { id, ...fields } = newRow;
    Object.keys(fields).forEach((field) => {
      if (newRow[field] !== oldRow[field]) {
        handleCellEditCommit({ id, field, value: newRow[field] });
      }
    });
    return newRow;
  };
  const handleEditCellChange = ({ id, field, props }) => {
    const { value } = props;
    if (!id || !field) {
      console.error("Invalid parameters in handleEditCellChange:", id, field);
      return;
    }
    setEditedFields((prevFields) => {
      const updatedFields = {
        ...prevFields,
        [id]: { ...prevFields[id], [field]: value },
      };
      return updatedFields;
    });
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
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
        fetchList();
        setEditedRow(null);
        setEditedFields({});
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
          processRowUpdate={handleProcessRowUpdate}
          onEditCellChange={handleEditCellChange}
          onEditCellChangeCommitted={handleCellEditCommit}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          rowHeight={150}
          sx={{
            border: 0,
            "& .MuiDataGrid-cell--editing": {
              backgroundColor: "#ffcccb",
              color: "#000000",
            },
          }}
        />
      </Paper>
    </>
  );
};

export default Update;
