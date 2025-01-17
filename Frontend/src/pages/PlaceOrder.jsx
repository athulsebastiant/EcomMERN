import React from "react";
import TextField from "@mui/material/TextField";
import CartTotal from "../components/CartTotal";
const PlaceOrder = () => {
  return (
    <div className="MainPlaceOrderDiv">
      {/* Left Side */}
      <div className="POsecDiv">
        <div className="leftSideDiv">
          <h4>DELIVERY INFORMATION</h4>
        </div>
        <div
          style={{ display: "flex", gap: "0.75rem", width: "100%" /* 12px */ }}
        >
          <TextField id="filled-basic" label="First Name" variant="filled" />

          <TextField id="filled-basic" label="Last Name" variant="filled" />
        </div>
        <div
          style={{ display: "flex", gap: "0.75rem", width: "100%" /* 12px */ }}
        >
          <TextField
            id="filled-basic"
            label="Street"
            variant="filled"
            sx={{ marginTop: "1rem", width: "28.59%" }}
          />
        </div>
        <div
          style={{ display: "flex", gap: "0.75rem", width: "100%" /* 12px */ }}
        >
          <TextField
            id="filled-basic"
            label="City"
            variant="filled"
            sx={{ marginTop: "1rem" }}
          />

          <TextField
            id="filled-basic"
            label="State"
            variant="filled"
            sx={{ marginTop: "1rem" }}
          />
          <TextField
            id="filled-basic"
            label="Pin"
            type="number"
            variant="filled"
            sx={{ marginTop: "1rem" }}
          />
        </div>
        <TextField
          id="filled-basic"
          label="Phone"
          type="number"
          variant="filled"
          sx={{ marginTop: "1rem" }}
        />
      </div>
      <div>
        <CartTotal />
      </div>
    </div>
  );
};

export default PlaceOrder;
