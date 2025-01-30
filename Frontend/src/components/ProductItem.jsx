import React, { useContext } from "react";
import "./ProductItem.css";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ShopContext } from "../context/ShopContext";
const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  const ProductCard = styled(Card)(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: theme.shadows[4],
      "& .MuiCardMedia-root": {
        transform: "scale(1.05)",
      },
    },
  }));

  const ProductImage = styled(CardMedia)({
    height: "300px",
    // paddingTop: "100%", // 1:1 aspect ratio
    transition: "transform 0.3s ease-in-out",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  });

  const ProductLink = styled(Link)({
    textDecoration: "none",
    color: "inherit",
    display: "block",
    height: "100%",
  });

  const ProductInfo = styled(CardContent)({
    flexGrow: 1,
    padding: "16px",
    "&:last-child": {
      paddingBottom: "16px",
    },
  });

  const ProductName = styled(Typography)({
    fontSize: "0.875rem",
    lineHeight: 1.4,
    marginBottom: "0.25rem",
    fontWeight: 600,
    letterSpacing: "0.02em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    color: "#1a1f36",
    transition: "color 0.2s ease",
    "&:hover": {
      color: "#4f46e5",
    },
  });

  const ProductPrice = styled(Typography)({
    fontSize: "1rem",
    fontWeight: 700,
    color: "#d5a419",
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "-0.01em",
    background: "linear-gradient(45deg, #d5a419, #6366f1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  });

  return (
    <ProductCard elevation={1}>
      <ProductLink to={`/product/${id}`}>
        <ProductImage image={image[0]} title={name} />
        <ProductInfo>
          <ProductName variant="body2">{name}</ProductName>
          <ProductPrice variant="body2">
            {currency}
            {price}
          </ProductPrice>
        </ProductInfo>
      </ProductLink>
    </ProductCard>
  );
};

export default ProductItem;
