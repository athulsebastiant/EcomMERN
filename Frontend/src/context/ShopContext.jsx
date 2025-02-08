import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";
import { useNavigate } from "react-router-dom";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 40;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      //console.log(backendUrl);
      if (response.data.success) {
        // Store products with category IDs only

        setProductList(response.data.products);
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

  const addToCart = async (itemId) => {
    if (!token) return;

    try {
      // ✅ Send request to backend first
      await axios.post(
        backendUrl + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );

      // ✅ Only update cart if API request is successful
      setCartItems((prevCart) => {
        let cartData = structuredClone(prevCart);
        cartData[itemId] = (cartData[itemId] || 0) + 1;
        return cartData;
      });
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Error adding to cart";
      setTimeout(() => toast.error(errorMessage), 0); // ✅ Ensures toast displays
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      totalCount += cartItems[items];
    }
    return totalCount;
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const updateQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        await axios.put(
          backendUrl + "/api/cart/update",
          { itemId, quantity },
          { headers: { token } }
        );
        // Return true to indicate success
        return true;
      } catch (error) {
        // Revert the cart state since the update failed
        setCartItems(cartItems);
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
        throw error; // Throw the error to be caught by the component
      }
    }
    return true; // Return true for cases where token is not present
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Error adding to cart";
      toast.error(errorMessage);
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      let itemInfo = productList.find((product) => product._id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[itemId];
      }
    }
    return totalAmount;
  };

  const value = {
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    productList,
    updateQuantity,
    getCartAmount,
    navigate,
    token,
    setToken,
    setCartItems,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
