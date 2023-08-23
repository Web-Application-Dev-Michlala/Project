const fs = require('fs');
const keys = require('custom-env');
keys.env(process.env.NODE_ENV,'./config');
const fbkey = process.env.FACEBOOK_LONG_KEY;

const postToFb = async (message, imagePath,endImage) => {
    const accessToken = fbkey;
    const pageId = '100885143063120';
    const url = `https://graph.facebook.com/v17.0/${pageId}/photos`;

    const imageBuffer = fs.readFileSync(imagePath);
    const imageBlob = new Blob([imageBuffer], { type: 'image/jpeg' });

    const formData = new FormData();
    formData.append('access_token', accessToken);
    formData.append('caption', message);
    formData.append('source', imageBlob, endImage);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        console.log('Post successfully sent!', data);
        return true;
    } catch (error) {
        console.log('Post request failed. Error:', error);
        return false;
    }
};

module.exports = {
    postToFb
};
