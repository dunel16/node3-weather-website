const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=190a436578ff4a47e97dfa0777e893df&query='+ latitude +','+ longitude +'&units=f'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0] + ' Its currently ' + body.current.temperature + ' degrees out. It feels like ' 
        + body.current.feelslike +' degrees out ' + ' and humidity of the ' + body.current.humidity)
        }
        
    })
}

module.exports = forecast