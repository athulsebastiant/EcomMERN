import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import imgup3 from "../assets/imgup3.png";
import "./Add.css";
import axios, { AxiosHeaders } from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
const Add = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(backendUrl + "/api/category/list");
        if (response.data.success) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", selectedCategory);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: { token },
        }
      );
      // console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setBrand("");
        setPrice("");
        setStock("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form className="AddForm" onSubmit={onSubmitHandler}>
      <div className="imgContainer">
        <p style={{ marginBottom: "0.5rem" }}>Upload Image</p>

        <div>
          <label htmlFor="image1">
            <img
              className="Proimg"
              src={!image1 ? imgup3 : URL.createObjectURL(image1)}
              alt="upload image"
              height={"150px"}
              width={"150px"}
            />
            <input
              type="file"
              id="image1"
              hidden
              onChange={(e) => {
                setImage1(e.target.files[0]);
              }}
            />
          </label>

          <label htmlFor="image2">
            <img
              className="Proimg"
              src={!image2 ? imgup3 : URL.createObjectURL(image2)}
              alt="upload image"
              height={"150px"}
              width={"150px"}
            />
            <input
              type="file"
              id="image2"
              hidden
              onChange={(e) => {
                setImage2(e.target.files[0]);
              }}
            />
          </label>

          <label htmlFor="image3">
            <img
              className="Proimg"
              src={!image3 ? imgup3 : URL.createObjectURL(image3)}
              alt="upload image"
              height={"150px"}
              width={"150px"}
            />
            <input
              type="file"
              id="image3"
              hidden
              onChange={(e) => {
                setImage3(e.target.files[0]);
              }}
            />
          </label>

          <label htmlFor="image4">
            <img
              className="Proimg"
              src={!image4 ? imgup3 : URL.createObjectURL(image4)}
              alt="upload image"
              height={"150px"}
              width={"150px"}
            />
            <input
              type="file"
              id="image4"
              hidden
              onChange={(e) => {
                setImage4(e.target.files[0]);
              }}
            />
          </label>
        </div>
      </div>

      <div style={{ width: "100%" }}>
        <p style={{ marginBottom: "0.5rem" }}>Product Name</p>
        <TextField
          onChange={(e) => setName(e.target.value)}
          value={name}
          id="outlined-basic"
          label="Enter Product Name"
          variant="outlined"
          required
          sx={{
            width: "100%",
            maxWidth: "500px",
            color: "#ddd",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ddd",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ddd",
            },
            "& .MuiInputLabel-root": {
              color: "#ddd",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#ddd",
            },
            "& .MuiOutlinedInput-input::placeholder": {
              color: "#ddd",
              opacity: 1,
            },
            "& .MuiOutlinedInput-input": {
              color: "#fff", // Makes the input text white
            },
          }}
        />
      </div>

      <div style={{ width: "100%" }}>
        <p style={{ marginBottom: "0.5rem" }}>Product Brand</p>
        <TextField
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
          id="outlined-basic"
          label="Enter Product Brand"
          variant="outlined"
          required
          sx={{
            width: "100%",
            maxWidth: "500px",
            color: "#ddd",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ddd",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ddd",
            },
            "& .MuiInputLabel-root": {
              color: "#ddd",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#ddd",
            },
            "& .MuiOutlinedInput-input::placeholder": {
              color: "#ddd",
              opacity: 1,
            },
            "& .MuiOutlinedInput-input": {
              color: "#fff", // Makes the input text white
            },
          }}
        />
      </div>

      <div style={{ width: "100%" }}>
        <p style={{ marginBottom: "0.5rem" }}>Product Description</p>

        <TextField
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          id="outlined-multiline-static"
          label="Enter Product Description"
          multiline
          rows={4}
          sx={{
            width: "100%",
            maxWidth: "500px",
            color: "#ddd",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ddd",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ddd",
            },
            "& .MuiInputLabel-root": {
              color: "#ddd",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#ddd",
            },
            "& .MuiOutlinedInput-input::placeholder": {
              color: "#ddd",
              opacity: 1,
            },
            "& .MuiOutlinedInput-input": {
              color: "#fff", // Makes the input text white
            },
          }}
          required
        />
      </div>

      <div style={{ width: "100%" }}>
        <p style={{ marginBottom: "0.5rem" }}>Product Price</p>
        <TextField
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          id="outlined-basic"
          label="Enter Product Price"
          variant="outlined"
          type="Number"
          required
          sx={{
            width: "100%",
            maxWidth: "500px",
            color: "#ddd",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ddd",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ddd",
            },
            "& .MuiInputLabel-root": {
              color: "#ddd",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#ddd",
            },
            "& .MuiOutlinedInput-input::placeholder": {
              color: "#ddd",
              opacity: 1,
            },
            "& .MuiOutlinedInput-input": {
              color: "#fff", // Makes the input text white
            },
          }}
        />
      </div>

      <div style={{ width: "100%" }}>
        <p style={{ marginBottom: "0.5rem" }}>Product Stock</p>
        <TextField
          onChange={(e) => setStock(e.target.value)}
          value={stock}
          id="outlined-basic"
          label="Enter Product Stock"
          variant="outlined"
          type="Number"
          required
          sx={{
            width: "100%",
            maxWidth: "500px",
            color: "#ddd",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ddd",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ddd",
            },
            "& .MuiInputLabel-root": {
              color: "#ddd",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#ddd",
            },
            "& .MuiOutlinedInput-input::placeholder": {
              color: "#ddd",
              opacity: 1,
            },
            "& .MuiOutlinedInput-input": {
              color: "#fff", // Makes the input text white
            },
          }}
        />
      </div>

      <div style={{ width: "100%" }}>
        <p style={{ marginBottom: "0.5rem" }}>Product Category</p>
        <TextField
          id="outlined-select-currency"
          select
          label="Select Category"
          sx={{
            width: "100%",
            maxWidth: "500px",
            color: "#ddd",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ddd",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ddd",
            },
            "& .MuiInputLabel-root": {
              color: "#ddd",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#ddd",
            },
            "& .MuiOutlinedInput-input::placeholder": {
              color: "#ddd",
              opacity: 1,
            },
            "& .MuiOutlinedInput-input": {
              color: "#fff", // Makes the input text white
            },
          }}
          required
          value={selectedCategory}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name} - {category.description}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <Button
        variant="contained"
        type="submit"
        sx={{
          width: "7rem",
          paddingTop: "0.75rem",
          paddingBottom: "0.75rem",
          marginTop: "1rem",
          backgroundColor: "black",
          color: "white",
        }}
      >
        ADD
      </Button>
    </form>
  );
};

export default Add;
