import express from "express"
import cors from "cors"
import pino from "pino-http"
import dotenv from "dotenv"  
import { getContacts } from "./sevices/contacts.js"
import { getContactById } from "./sevices/contacts.js"
import env from "../utils/env.js"

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
    app.use(logger);
    app.use(express.json()); 
   
app.get("/", (req, res)=>{
    res.send('<h1>home page<h1/>')
});
    app.get("/contacts", async(req, res) => {
        const result = await getContacts()
        res.json({
            status: 200,
            result
        })
    })
  app.get("/contacts/:id", async (req, res) => {
        try {
            const { id } = req.params;

            const data = await getContactById(id);

            if (!data) {
                return res.status(404).json({
                    message: `Contact with id=${id} not found`
                })
            }

            res.json({
                status: 200,
                data,
                message: `Contact with id=${id} find success`
            })
        }
        catch (error) {
            if (error.message.includes("Cast to ObjectId failed")) {
                error.status = 404;
            }
            const { status = 500 } = error;
            res.status(status).json({
                message: error.message
            })
        }
    })
    app.use((req, res) => {
        res.status(404).json({
            message: "Page not Found"
        })
    })
app.listen(port, () => console.log(`Server running on ${port} PORT`));
    
}
export {setupServer}