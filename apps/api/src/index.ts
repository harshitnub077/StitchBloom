import express, { Express, Request, Response } from "express";
import cors from "cors";
import { formatPrice } from "@crochetverse/shared";

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

import healthRoutes from "./routes/health.routes";
app.use("/health", healthRoutes);

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Welcome to CrochetVerse API",
        formattedPriceExample: formatPrice(123.45),
    });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
