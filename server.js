
import app from "./app.js";
import connectToDatabase from "./config/database.js"
import { PORT } from "./config/env.js";

app.listen(PORT,async ()=>{
    await connectToDatabase()
    console.log(`Server is listening on ${PORT}`)
})

