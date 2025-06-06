const path = require("path")
const express = require("express")
const hbs = require("hbs")
const app = express()
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const viewsdirectory = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")
//"views" is the default location according to handlebars,if you want to change this you have to app.set (views , the new name of the folder)(templates in our case);
app.set("views",viewspath)
app.set("view engine" , "hbs")
hbs.registerPartials(partialsPath)


app.use(express.static(viewsdirectory))


app.get('/', (req,res)=>{
    res.render('index',{
        title :"Weather App",
        name:"Pragalbh"
    }) 
})


app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About Me",
        name:"Pragalbh"
    })
})



app.get("/help",(req,res)=>{
    res.render("help",{
        helptext: ["If you're having trouble using the Weather App, here's how to get started:",

                " 1 -> 🔍 Enter the name of a city, town, or address in the search box on the homepage.",
                " 2 -> 📍 Click the “Search” button to fetch the weather for that location.",
                " 3 -> ☁️ You’ll see the current forecast and the exact location we found.",
                " 4 -> ⚠️ If you get an error, try checking your spelling or using a different place.",
        ],
        title : "Help",
        name : "Pragalbh"
    })
})
app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : "please provide an address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
    
    forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
            return res.send({error})
        }
    
    res.send({
        forecast : forecastData,
        location ,
        address : req.query.address
     })
    })
   })
 })

app.get('/help/*' ,(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Pragalbh',
        errormessage :'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Pragalbh',
        errormessage : 'page not found'
    })
})

app.listen(3000, () =>{ 
console.log("server is up on port 3000")
}) 