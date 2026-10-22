require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.PORT;
const invokeGeminiAi = require("./src/services/ai.service");

const connectToDB = require("./src/Config/database");

connectToDB();
invokeGeminiAi();

app.listen(PORT, () => {
  console.log(`Server Running on PORT :${PORT}`);
});
