const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=ef7ac7ac587420baa441d49c615cc7a0&query=' + latitude + ',' + longitude + '&units=f'

    request({ url: url, json: true}, (error, response) => {

        if (error) {
            callback('Unable to connect to the weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, "It's currently " + response.body.current.temperature + " degrees out. It feels like " + response.body.current.feelslike + " degrees out.")
        }

    })

}
module.exports = forecast