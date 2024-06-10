import mongoose, { connections } from "mongoose";
import { DB_NAME } from "../constant.js";

const connection = async () => {
  try {
    const connection = await mongoose.connect(
      `mongodb+srv://itxelegantmansoori:basit1234@cluster0.wlbop4e.mongodb.net/fyp?retryWrites=true&w=majority `
    );
    console.log(connection.connection.host, "mogodb connedted");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connection;
