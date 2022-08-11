const request = require('request')

const geocode = (address, callback) => {
    
    const url = 'http://api.positionstack.com/v1/forward?access_key=e6b302e7785a2574d336ea4d37259174&query=' + address + '&limit=1'

    request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (response.body.data.length === 0) {
            callback('Unable to find location. Try another seartch', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.data[0].latitude,
                longitude: response.body.data[0].longitude,
                country: response.body.data[0].country
                
            })
        }
    })

}
module.exports = geocode