const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()


// define path for express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Fahad'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'Fahad'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'Fahad'
    })
})



// it is not going to reach here , since we are using app.use
// app.get('', (req, res) => {
//     res.send('Hello express!')
// })




// app.get('/help', (req, res) => {
//     res.send('Help Page')
// })

// app.get('/about', (req, res) => {
//     res.send('About Page')
// })





app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'You must provide an address'})
    }

    geocode(req.query.address, (error, { latitude, longitude, country } = {}) => {
    
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
    
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location: country,
                address: req.query.address
            })
          })
    })

    
})


app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({error: 'You must provide a search term'})
    }

    res.send({
        production: []
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found'
    })
})


// app.com
// app.com/help
// app.com/about


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})