const express = require('express');
const router = express.Router();

const homepageController = require('../controllers/homepageController.js')

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
        res.sendFile('returnPolicy.html', { root: 'public/About' });
      });
    
router.route('/getCategorys')
    .get(homepageController.getAllCategorys)

router.route('/css')
    .get(homepageController.getHomePageCss)

router.route('/js')
    .get(homepageController.getHomePageJs)
   
router.route('/:id')
    .get(homepageController.getCategoryByName)
    .post(homepageController.getProductById)

    module.exports = router;
