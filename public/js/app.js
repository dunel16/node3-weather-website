console.log('Client side javascript is loaded.')

/*fetch('http://localhost:3000/weather?address=Boston').then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
        }
        else{
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})*/

const weatherForm = document.querySelector('form')
const button = document.querySelector('button')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = 'From javascript'
//console.log(weatherForm.DOCUMENT_NODE)

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading... '
    messageTwo.textContent = ''
     fetch('http://localhost:3000/weather?address='+ search.value).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast        }
    })
})
})



