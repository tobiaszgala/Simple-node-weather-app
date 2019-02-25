// https for making request
const https = require('https');
// http to use STATUS_CODES for more friendly error message
const http = require('http');
// config file with api token
const api = require('./api.json');

/**
 * Prints error message
 * @param {object} errorMsg - Requires error object to access message property
 */
const printError = errorMsg => {
    console.error(errorMsg.message);
}
/**
 * Prints message to the screen
 * @param  {string} location - City name
 * @param  {string} country - Country name
 * @param  {string} temp - Current temperature
 */
const printMessage = (location, country, temp) => {
    console.log(`Current temperature in ${location}, ${country} is ${temp}F`);
}
/**
 * Gets weather information from Open Weather Map API
 * @param  {string} arg - Argument form global process object
 */
const getWeather = (arg) => {
    // if there is no arguments print error message
    if (!arg) {
        printError(new Error(`Please provide argument`));
    } else {
        try {
            // set parameters for the request
            const param = {
                path: isNaN(arg) ? 'q' : 'zip',
                units: 'imperial',
                appid: api.key
            }
            // make request to the api
            const request = https.get(`https://api.openweathermap.org/data/2.5/weather?${param.path}=${arg}&units=${param.units}&appid=${param.appid}`, response => {
                // if successful 
                if (response.statusCode === 200) {
                    let body = '';
                    response.on('data', chunk => {
                        // get buffer information and append to body
                        body += chunk.toString();
                    });
                    response.on('end', () => {
                        try {
                            // when request is finished parse buffer and display json data
                            let json = JSON.parse(body);
                            printMessage(json.name, json.sys.country, Math.round(json.main.temp));
                        } catch (e) {
                            printError(e);
                        }
                    });
                } else {
                    const error = new Error(`There was an error getting data for ${arg} (${response.statusCode} - ${http.STATUS_CODES[response.statusCode]})`);
                    printError(error);
                }
            });
            request.on('error', e => printError(e));
        } catch (e) {
            printError(e);
        }
    }
}
// export module
module.exports.get = getWeather;