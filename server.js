import express from "express";
import colors from 'colors';
import dotent from "dotenv"
import connect from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categroyRoutes from "./routes/categoryRoutes.js";
import errorMiddleWhere from "./middlewhere/errorMiddlewhere.js";
import cors from "cors"
import productRoutes from "./routes/ProducateRoutes.js";
import router from "./routes/tempRoutes.js";
import temprouter from "./routes/tempRoutes.js";
// rest object
const app = express();

// dotenv config
dotent.config();

// data base config
connect();

// middlewhere
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
}))

// rest api
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/category', categroyRoutes);
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/temp', temprouter)

// validation middlewhere
app.use(errorMiddleWhere);

// PORT
const PORT = process.env.PORT;

// PORT Listen
app.listen(8080, () => {
    console.log(`port listen on ${PORT}`.bgCyan.white);
})