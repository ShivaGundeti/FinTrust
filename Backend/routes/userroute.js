import express from "express";
import { register,login,getuserbyid,getusers} from "../controller/Usercontroller.js";
import jwt from "jsonwebtoken"
const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/getUser",getuserbyid)
router.get("/getUsers",getusers)
router.get("/check", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ loggedIn: false });
  }
  try {
    const data  = jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.json({ loggedIn: true,data:data});
  } catch (err) {
    console.log("JWT verify error:", err.message);
    res.json({ loggedIn: false });
  }
});
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.json({ success: true, message: "Logged out successfully" });
});
export default router;