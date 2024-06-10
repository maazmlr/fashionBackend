import User from "../models/userModel.js";
import express from "express"
const router=express.Router()


router.get("/",(req,res)=>{
  return res.send("helo")
})

router.post("/signup",async(req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Hash the password

    // Create a new user object
    const newUser = new User({
      type:"user",
      name,
      email,
      password
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ success: true, message: 'User signed up successfully',user:newUser });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ success: false, message: 'Error signing up user' });
  }
}
)

router.post("/login",async(req,res)=>{
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Compare the password
    const isPasswordMatch = password === user?.password
    if (!isPasswordMatch) {
      return res.status(400).json({ success: false, message: 'Invalid password',user });
    }

    

    res.status(200).json({ success: true, message: 'User signed in successfully' });
  } catch (error) {
    console.error('Error signing in user:', error);
    res.status(500).json({ success: false, message: 'Error signing in user' });
  }
})



export default router;
