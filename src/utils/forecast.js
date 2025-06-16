const request  = require("request")

const forecast = (lat,lon,callback)=>{
    const url = "http://api.weatherapi.com/v1/current.json?key=cf2a5ebd11c54eb894d184924241906&query="+lat+","+lon

request({url ,json:true},(error,{body})=>{
    if(error){
        callback("unable to connect to the network" , undefined)
    }
    else if(body.current === undefined){
        callback("wrong inputs",undefined)
    }
    else{
        callback(undefined,body.current.condition.text + " . it is currently " + body.current.temp_c + " but feels like " + body.current.feelslike_c
            + " . humidity is " + body.current.humidity + " % "
        ) 
    }
}


)
}

module.exports = forecast