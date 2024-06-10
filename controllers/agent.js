import Agent from "../models/agentModel.js";
import express from "express";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  try {
    // Check if the email is already registered
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Hash the password

    // Create a new agent object
    const newAgent = new Agent({
      type:"agent",
      name,
      email,
      password
    });

    // Save the agent to the database
    await newAgent.save();

    res.status(201).json({ success: true, message: 'Agent signed up successfully',user:newAgent });
  } catch (error) {
    console.error('Error signing up agent:', error);
    res.status(500).json({ success: false, message: 'Error signing up agent' });
  }
});

router.post("/login",async(req,res)=>{
  const { email, password } = req.body;

  try {
    // Find the agent by email
    const agent = await Agent.findOne({ email });
    if (!agent) {
      return res.status(400).json({ success: false, message: 'Agent not found' });
    }

    // Compare the password
    const isPasswordMatch = password===agent?.password
    if (!isPasswordMatch) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    // Generate JWT token

    res.status(200).json({ success: true, message: 'Agent signed in successfully',user:agent });
  } catch (error) {
    console.error('Error signing in agent:', error);
    res.status(500).json({ success: false, message: 'Error signing in agent' });
  }
})

export default router;
