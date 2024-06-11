import connection from "./src/db/index.js";
import { app } from "./src/app.js";

const PORT = process.env.PORT || 8000;

connection()
  .then(
    app.listen(PORT, () => {
      console.log("server is running on porty ", PORT);
    })
  )
  .catch((err) => console.log("connection failed", err));
