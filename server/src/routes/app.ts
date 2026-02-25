import * as express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {
    googleMapsApiKeyJson: JSON.stringify(process.env.GOOGLE_MAPS_API_KEY || ''),
  });
});

module.exports = router;
