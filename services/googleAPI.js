const keys=require('custom-env')
keys.env(process.env.NODE_ENV,'./config')
const googlekey=process.env.GOOGLE_KEY;


const getKey = async () => {
    return googlekey;
}

module.exports = {
    getKey
}