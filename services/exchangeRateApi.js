const http = require('http');
const keys=require('custom-env')
keys.env(process.env.NODE_ENV,'./config')
const rateskey=process.env.RATES_KEY;
/**
 * this function will use http get, to get current USD and ILS rates
 * 
 * @returns JSON with the USD and ILS rates in base of EUR.
 */
const getRates = ()  => {
    return new Promise((resolve) => {
        const apiUrl = rateskey; 
        const apiRequest = http.get(apiUrl, apiResponse => {
            let data = '';

            apiResponse.on('data', chunk => {
                data += chunk;
            });

            apiResponse.on('end', () => {
                resolve(data);
            });
        });

        apiRequest.on('error', error => {
            resolve('Error');
        });
    });
}

module.exports = {
    getRates
};
