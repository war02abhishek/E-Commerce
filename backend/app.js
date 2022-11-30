import express from "express"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
const __dirname = path.resolve();
const app = express();

import errorMiddleware from "./middleware/error.js"
// import fileUpload from "express-fileupload"

app.use(express.json());
app.use(cookieParser());//()bohot jaruri hai mt bhulna
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(fileUpload());

//Config
// dotenv.config({ path: "backend/config/config.env" });
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/config.env" });
}

// Route Imports
import product from "./routes/productRoute.js"
import user from "./routes/userRoute.js"

import order from "./routes/orderRoute.js"
import  add from "./routes/addRoute.js"
import payment from "./routes/paymentRoute.js"

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", add);
app.use("/api/v1", payment);
//middleware 
app.use(express.static(path.join(__dirname,"../MERN_PROJECT/frontend/build")))

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})

app.use(errorMiddleware);
export default app;
