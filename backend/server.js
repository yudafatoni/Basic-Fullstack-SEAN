const express = require("express")
const supabase = require("@supabase/supabase-js")

const app = express()
app.use(express.json())

const PORT = 1234 || process.env.PORT

const SUPABASE_URL = "https://cyspzmqanbqrqtjorocn.supabase.co"
const SUPABASE_SERVICE_ROLE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5c3B6bXFhbmJxcnF0am9yb2NuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzI4MTMxOSwiZXhwIjoyMDg4ODU3MzE5fQ.a6GViype5T1MPxJamo0XEti_yGDYwrmfOJZV-AkEwu8"

const db = supabase.createClient(SUPABASE_URL,SUPABASE_SERVICE_ROLE)

app.get("/", async(request, response) => {
    const getBlog = await db.from("blog").select()
    response.json({getBlog})
})

app.post("/", async(request, response) =>{
    const{title, description} = request.body
    const createPost = await db.from("blog").insert({title,description})
    console.log("app.post  ~ create.post : ", createPost)
    response.send({ createPost })
})

app.listen(PORT, () => {
    console.log("Server Running On Port", PORT)
})