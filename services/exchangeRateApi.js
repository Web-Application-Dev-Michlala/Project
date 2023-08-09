const http = require('http');
//uses exchangeRateApi with http GET request to get data and send it back to controller
const getRates = () => {
    return new Promise((resolve) => {
        const apiUrl = 'http://api.exchangeratesapi.io/v1/latest?access_key=c093d2883542b4f930fd77303c502c42&symbols=USD,ILS'; 
        const apiRequest = http.get(apiUrl, apiResponse => {
            let data = '';

            apiResponse.on('data', chunk => {
                data += chunk;
            });

            apiResponse.on('end', () => {
                console.log('data from service ' + data);
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
