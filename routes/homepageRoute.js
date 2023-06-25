const express = require('express');
const router = express.Router();

const homepageController = require('../controllers/homepageController.js')
const loginController = require('../controllers/loginController.js')
const adminPageController = require('../controllers/adminPageController.js')

router.route('/')
    .get(homepageController.getHomePage)


router.route('/ReturnPolicy').get((req, res) => {
    res.sendFile('returnPolicy.html', { root: 'public/ReturnPolicy' });
});

router.route('/PrivacyPolicy').get((req, res) => {
    res.sendFile('privacyPolicy.html', { root: 'public/PrivacyPolicy' });
});

router.route('/QuestionsAndAnswers').get((req, res) => {
    res.sendFile('FAQ.html', { root: 'public/FAQ' });
});

router.route('/About').get((req, res) => {
    res.sendFile('about.html', { root: 'public/about-us' });
});

router.route('/googleMaps').get((req, res) => {
    res.sendFile('map.html', { root: 'public/googleMap' });
});

router.route('/adminPage/').get((req, res) => {
    res.sendFile('deleteButtons.html', { root: 'public/adminPage' });
});


router.route('/deleteProduct')
    .delete(adminPageController.deleteProduct);

router.route('/getCategoryDetails/:categoryName')
    .get(adminPageController.getCategoryDetails);
    
router.route('/getCategorys')
    .get(homepageController.getAllCategorys)
    
router.route('/:categoryName')
    .delete(adminPageController.deleteCategory);

router.route('/isLoggedIn')
.get(loginController.isLoggedInNav);
   
router.route('/:id')
    .get(homepageController.getCategoryByName)
    .post(homepageController.getProductById)
    


module.exports = router;
