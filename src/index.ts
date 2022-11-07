import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { categoryRouter } from "./category/category.router";
import { productRouter } from "./product/product.router";

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
