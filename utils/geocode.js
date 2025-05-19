const request =  require ("request")

const geocode = (address,callback) => {
    const url = "https://geocode.maps.co/search?q=" + encodeURIComponent(address) + "&api_key=66798f65277e5262087991mkec1ca86"
    request({url , json: true },function(error,{body}){
        if(error){
         callback("unabe to connect to the network" , undefined)
        }
        else if(body[0] === undefined){
            callback("wrong inputs" , undefined)
        }
        else{
            callback (undefined,{
                latitude :  body[0].lat ,
                longitude : body[0].lon,
                location : body[0].display_name
            })
        }
        })
    
}

module.exports = geocode