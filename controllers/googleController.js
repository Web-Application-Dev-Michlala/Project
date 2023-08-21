const googleService=require('../services/googleAPI')
const getKey = async (req,res) => 
{
  const key=  await googleService.getKey();
  res.json(key);
}



module.exports = 
{
    getKey
}