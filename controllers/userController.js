
const getUserPage = async (req,res) => 
{
    if(req.session.username===null)
    {
        res.redirect('/login')
    }
    else if(req.session.admin===true)
    {
        res.redirect('/adminPage')
    }
    else
    {
        res.sendFile('user.html', { root: 'public/userPage' });
    }

    
}

module.exports = {
    getUserPage,
}