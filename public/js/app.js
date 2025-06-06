
const weatherform = document.querySelector("form")
const input = document.querySelector("input")
const messageone = document.querySelector("#message-1")
const messagetwo = document.querySelector("#message-2")

weatherform.addEventListener("submit" , (e) => {
    //  e.preventDefault() is used to prevent refreshing the page by default
    e.preventDefault()

    const location = input.value
    messageone.textContent="Loading..."
    messagetwo.textContent=""

    fetch("http://localhost:3000/weather?address=" + location ).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
             messageone.textContent = data.error
            }
            else{
             messageone.textContent =data.location
             messagetwo.textContent =data.forecast
            }
        })
  })
})