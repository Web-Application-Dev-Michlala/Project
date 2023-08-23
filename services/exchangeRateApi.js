const http = require('http');
const keys=require('custom-env')
keys.env(process.env.NODE_ENV,'./config')
const rateskey=process.env.RATES_KEY;
//uses exchangeRateApi with http GET request to get data and send it back to controller
const getRates = ()  => {
    return new Promise((resolve) => {
        const apiUrl = rateskey; 
        const apiRequest = http.get(apiUrl, apiResponse => {
            let data = '';

            apiResponse.on('data', chunk => {
                data += chunk;
            });

            apiResponse.on('end', () => {
                console.log(data);
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
