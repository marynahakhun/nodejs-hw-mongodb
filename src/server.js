import express from "express"
import cors from "cors"
import pino from "pino-http"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"  
import env from "../src/utils/env.js"
import notFoundHandler from "./midldlewares/notFoundHandler.js"
import contactsRouter from "./routers/contacts-router.js"
import authRouter from "./routers/auth-router.js"
import errorHandler from "./midldlewares/errorHandler.js"
const app = express()

dotenv.config()
const port = env("PORT", "3000");
const setupServer = () => {
     const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    })
    app.use(cors());
    // app.use(logger);

    app.use(express.json()); 
    app.use(cookieParser());
   
    app.use("/contacts", contactsRouter);
    app.use("/auth", authRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
app.listen(port, () => console.log(`Server running on ${port} PORT`));
    
}
export {setupServer}