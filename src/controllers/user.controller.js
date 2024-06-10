import { User } from "../models/user.model.js";
import { ApiResponsone } from "../../utils/Apiresponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { upload } from "../../utils/cloudinary.js";
import { ApiError } from "../../utils/error.js";
import bcrypt from "bcrypt";

const registerUser = asyncHandler(async (req, res) => {
  try {
    console.log("body is ", req.body);
    const { fullName, email, password } = req.body;
    console.log(email, "email");
    if ([fullName, email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({
      $or: [{ fullName }, { email }],
    });

    if (user) {
      new ApiError(400, "user is al ready existed ");
    }

    const newUser = await User.create({
      fullname: fullName,
      email,
      password,
    });
    console.log(newUser);

    const createdUSer = await User.findById(newUser?._id).select("-password");
    if (!createdUSer)
      new ApiError(500, "some thing went wrong while creating the user");
    console.log(createdUSer);
    return res
      .status(201)
      .json(
        new ApiResponsone(201, createdUSer, "user registered successfully")
      );
  } catch (error) {
    console.log(error);
  }

  //get body
  //validate user
  // save into db
  // retun msg
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(400, "Invalid email or password");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new ApiError(400, "Invalid email or password");
    }

    const userWithoutPassword = await User.findById(user._id).select(
      "-password"
    );

    return res
      .status(200)
      .json(
        new ApiResponsone(
          200,
          userWithoutPassword,
          "User logged in successfully"
        )
      );
  } catch (error) {
    console.log(error);
    res
      .status(error.statusCode || 500)
      .json(new ApiResponsone(error.statusCode || 500, null, error.message));
  }
});

export { registerUser, loginUser };
