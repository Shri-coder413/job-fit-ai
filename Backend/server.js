require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.PORT;

const connectToDB = require("./src/Config/database");

connectToDB();

app.listen(PORT, () => {
  console.log(`Server Running on PORT :${PORT}`);
});
