import mongoose, { connections } from "mongoose";
import { DB_NAME } from "../constant.js";

const connection = async () => {
  try {
    const connection = await mongoose.connect(
      `mongodb+srv://hashiradnan55:duV57gxalfflwe21@quizgame-mernstack.8jnxvsr.mongodb.net/?retryWrites=true&w=majority `
    );
    console.log(connection.connection.host, "mogodb connedted");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connection;
