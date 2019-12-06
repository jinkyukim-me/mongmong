const express = require('express');
const router = express.Router();
const knex = require('knex');
const cors = require('cors');
const app = express();


//INDEX
router.get('/',
  (req, res, next) => {
    res.json([
      {
       "postId": "1",
       "summary": "이러쿵 저러쿵",
       "postDt": "2019-11-28, 22:00",
       "createdDt": "2019-11-28, 23:00",
       "modifiedDt": "2010-11-29, 23:00"
      },
      {
       "postId": "2",
       "summary": "이러쿵 저러쿵 저리 쾅쾅쾅",
       "postDt": "2019-11-29, 20:00",
       "createdDt": "2019-11-29, 20:00",
       "modifiedDt": ""
      },
    ])
  });

//GET 1
router.get('/:postId',
(req, res) => {
  res.json(
    {
     "postId": "1",
     "summary": "이러쿵 저러쿵",
     "postDt": "2019-11-28 22:00",
     "createdDt": "2019-11-28 23:00",
     "modifiedDt": "2010-11-29 23:00"
    }
   )
});

//GET 2
router.get('/:year/:month/:day',
(req, res) => {
  res.json(
    {
     "postId": "1",
     "summary": "이러쿵 저러쿵",
     "postDt": "2019-11-28 22:00",
     "createdDt": "2019-11-28 23:00",
     "modifiedDt": "2010-11-29 23:00"
     }
   )
});


module.exports = router;