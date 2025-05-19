const request = require("request")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const input = process.argv[2]
if(!input){
    console.log("please give an address")
}
else
{

geocode( input ,(error,{latitude, longitude ,location}) =>{
    if(error){
        return console.log(error)
    }
  
    forecast(latitude,longitude,(error,data)=>{
        if (error){
            return console.log(error)
        }
   
    console.log(location)
    console.log(data)
   
    console.log("working")
        
      })
})
}


