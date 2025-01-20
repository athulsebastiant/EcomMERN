import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = request.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized, Login Again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {}
};
