const fs = require('fs');
const keys = require('custom-env');
keys.env(process.env.NODE_ENV,'./config');
const fbkey = process.env.FACEBOOK_LONG_KEY;
const userID=process.env.SCOPED_USER_ID;
const longLiveUserToken=process.env.LONG_LIVE_USER_ACCESS_TOKEN_FB;
/**
 * Posts picture and caption to facebook using graph API
 * 
 * @param {string} message 
 * @param {string} imagePath
 * @param {string} endImage image name
 * @returns true on success false on failure
 */
const postToFb = async (message, imagePath,endImage) => {
    const pageId = '100885143063120';
    const url = `https://graph.facebook.com/v17.0/${pageId}/photos`;  
    const token=await getPageToken();
    if(token===null)
        return false;
    const imageBuffer = fs.readFileSync(imagePath); 
    const imageBlob = new Blob([imageBuffer], { type: 'image/jpeg' });//data structure to hold the image

    const formData = new FormData();//represents a form.
    formData.append('access_token', token);
    formData.append('caption', message);
    formData.append('source', imageBlob, endImage);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if(data.id!=null)
        {
            console.log('Post successfully sent!', data);
            return true;
        }
        else
        {
            console.log('Post request failed ',data);
            return false;
        }
    } 
    catch (error) 
    {
        console.log('Post request failed. Error:', error);
        return false;
    }
};
const getPageToken= async () => {
    apiURL="https://graph.facebook.com/v17.0/"+userID+"/accounts?access_token="+longLiveUserToken
    const response = await fetch(apiURL, {
        method: 'GET',
    });
try{
    const data = await response.json();
    if(data.data[0].access_token!==null)
    {
        return data.data[0].access_token;
    }
    else
    {
        console.log('Post request failed ',data);
        return null;
    }
}
catch (error) 
{
    console.log('Post request failed. Error:', error);
    return false;
}
}
module.exports = {
    postToFb
};
