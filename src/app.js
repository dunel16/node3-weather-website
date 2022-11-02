const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
//Define port that be used
const port = process.env.PORT || 3000
//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'Dunel '
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Dunel Nuñez '
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Dunel',
        message: 'I need help'
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Dunel',
        errorMessage: 'Help article not found.'
    })
})

app.get('/weather', (req,res) => { 
    if(!req.query.address){
        return res.send({
            error: 'You must provide a weather term for the search.'
        })
    }
    else{
           geocode( req.query.address, (error, {latitude, longitude, location} = {}) => {
           if (error){
               return res.send(error)
           }
            forecast(latitude, longitude, (error, forecastData) => {
               if (error){
                   return res.send(error)
                }
               res.send({
                forecast: forecastData,
                location: location,
                })
            })      
    
         })
    }
})

app.get('/products', (req,res) => { 
    if(!req.query.search){
        return res.send({
            error: 'You muts provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title: '404',
        name: 'Dunel',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port 3000.')
})
