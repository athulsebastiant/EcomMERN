import React from "react";
import TextField from "@mui/material/TextField";
import uploadimg2 from "../assets/uploadimg2.jpg";
import "./Add.css";
const Add = () => {
  return (
    <form className="AddForm">
      <div className="imgContainer">
        <p style={{ marginBottom: "0.5rem" }}>Upload Image</p>

        <div>
          <label htmlFor="image1">
            <img
              className="Proimg"
              src={uploadimg2}
              alt="upload image"
              height={"150px"}
              width={"150px"}
            />
            <input type="file" id="image1" hidden />
          </label>

          <label htmlFor="image2">
            <img
              className="Proimg"
              src={uploadimg2}
              alt="upload image"
              height={"150px"}
              width={"150px"}
            />
            <input type="file" id="image2" hidden />
          </label>

          <label htmlFor="image3">
            <img
              className="Proimg"
              src={uploadimg2}
              alt="upload image"
              height={"150px"}
              width={"150px"}
            />
            <input type="file" id="image3" hidden />
          </label>

          <label htmlFor="image4">
            <img
              className="Proimg"
              src={uploadimg2}
              alt="upload image"
              height={"150px"}
              width={"150px"}
            />
            <input type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div style={{ width: "100%" }}>
        <p style={{ marginBottom: "0.5rem" }}>Product Name</p>
        <TextField
          id="outlined-basic"
          label="Enter Product Name"
          variant="outlined"
          required
          sx={{ width: "100%", maxWidth: "500px" }}
        />
      </div>

      <div style={{ width: "100%" }}>
        <p style={{ marginBottom: "0.5rem" }}>Product Brand</p>
        <TextField
          id="outlined-basic"
          label="Enter Product Brand"
          variant="outlined"
          required
          sx={{ width: "100%", maxWidth: "500px" }}
        />
      </div>

      <div style={{ width: "100%" }}>
        <p style={{ marginBottom: "0.5rem" }}>Product Description</p>

        <TextField
          id="outlined-multiline-static"
          label="Enter Product Description"
          multiline
          rows={4}
          sx={{ width: "100%", maxWidth: "500px" }}
          required
        />
      </div>

      <div style={{ width: "100%" }}>
        <p style={{ marginBottom: "0.5rem" }}>Product Price</p>
        <TextField
          id="outlined-basic"
          label="Enter Product Price"
          variant="outlined"
          type="Number"
          required
          sx={{ width: "100%", maxWidth: "500px" }}
        />
      </div>

      <div style={{ width: "100%" }}>
        <p style={{ marginBottom: "0.5rem" }}>Product Stock</p>
        <TextField
          id="outlined-basic"
          label="Enter Product Stock"
          variant="outlined"
          type="Number"
          required
          sx={{ width: "100%", maxWidth: "500px" }}
        />
      </div>

      <div style={{ width: "100%" }}>
        <p style={{ marginBottom: "0.5rem" }}>Product Category</p>
        <TextField
          id="outlined-select-currency"
          select
          label="Select Category"
          helperText="Please select your category"
          sx={{ width: "100%", maxWidth: "500px" }}
          required
        ></TextField>
      </div>
    </form>
  );
};

export default Add;
