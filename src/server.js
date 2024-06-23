import express from "express"
import cors from "cors"
import pino from "pino-http"
import dotevn from "dotenv"  
const app = express()

dotevn.config()
const { PORT } = process.env
console.log(PORT)
const setupServer = () => {
     const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    })
    app.use(cors());
    app.use(logger);
   
app.get("/", (req, res)=>{
    res.send('<h1>home page<h1/>')
});
    app.use((req, res) => {
        res.status(404).json({
            message: "Page not Found"
        })
    })
app.listen(3000, () => console.log("connection with port 3000"));
    
}
export {setupServer}