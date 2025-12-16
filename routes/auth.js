import { Router } from "express";
import bcrypt from 'bcrypt';
import User from "../modules/user.js";
const router = Router();

// sign the page
router.post("/register",async(req, res) => {
   try {
       const { username, email, password } = req.body;
       const hashPassword = bcrypt.hashSync(password, 10);
       const user = new User({ username: username, email: email, password: hashPassword });
       await user.save().then(() => {
           res.status(200).json({message:"Sign up successfully, do sign in now."})
       })
   } catch (error) {
     res.status(200).json({message:"User already exist."})
   } 
});

router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).json({message:"Invalid email, please try again."})
        }
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(200).json({message:"your password is incorrect, try again."})
        }
        const { password, ...others } = user.toObject();
        res.status(200).json({others});
    } catch (error) {
        res.status(400).json(error.message);
    }
});

export default router;