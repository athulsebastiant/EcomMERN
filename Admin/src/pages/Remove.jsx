import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import imgup3 from "../assets/imgup3.png";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import "./Remove.css";
const Remove = ({ token }) => {
  const [list, setList] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const paginationModel = { page: 0, pageSize: 5 };
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
    },

    {
      field: "image1",
      headerName: "Image 1",
      editable: false,
      sortable: false,
      width: 160,
      renderCell: (params) =>
        params.value ? (
          <div className="imgDiv">
            <img src={params.value} alt="Image 3" className="img" />
          </div>
        ) : (
          <div className="imgDiv">
            <img src={imgup3} alt="Image 3" className="img" />
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
          <div className="imgDiv">
            <img src={params.value} alt="Image 3" className="img" />
          </div>
        ) : (
          <div className="imgDiv">
            <img src={imgup3} alt="Image 3" className="img" />
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
          <div className="imgDiv">
            <img src={params.value} alt="Image 3" className="img" />
          </div>
        ) : (
          <div className="imgDiv">
            <img src={imgup3} alt="Image 3" className="img" />
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
          <div className="imgDiv">
            <img className="imgDiv" />
          </div>
        ) : (
          <div className="imgDiv">
            <img src={imgup3} alt="Image 3" className="img" />
          </div>
        ),
    },
  ];
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

  const handleDelete = async () => {
    try {
      console.log("Starting deletion, selectedRows:", selectedRows);

      const deletePromises = selectedRows.map((rowId) => {
        console.log("Creating delete request for ID:", rowId);
        return axios({
          method: "delete",
          url: `${backendUrl}/api/product/remove`,
          headers: { token },
          data: { id: rowId },
        })
          .then((res) => {
            console.log("Delete response for ID", rowId, ":", res);
            return res;
          })
          .catch((err) => {
            console.log("Delete error for ID", rowId, ":", err.response || err);
            throw err;
          });
      });

      const results = await Promise.all(deletePromises);
      console.log("All delete results:", results);

      toast.success("Products deleted successfully");
      fetchList();
    } catch (error) {
      console.log("Error in handleDelete:", error.response || error);
      toast.error(error.message);
    }
  };
  return (
    <>
      <p style={{ marginBottom: "1.5rem" }}>Delete Products</p>
      <Button
        variant="contained"
        sx={{ marginBottom: "1rem" }}
        onClick={handleDelete}
      >
        Delete
      </Button>
      <Paper sx={{ height: 550, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          onRowSelectionModelChange={(ids) => {
            console.log("Selected IDs:", ids);
            setSelectedRows(ids);
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          rowHeight={150}
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
};

export default Remove;
