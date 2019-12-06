const express = require('express');
const router = express.Router();
const knex = require('knex');
const cors = require('cors');
const app = express();

//Index
router.get('/',
  (req, res, next) => {
    res.json([
      {
       "postId": "1",
       "paragraph": "오늘의 일기는 이러쿵 저러쿵 조로콩콩콩",
       "affectivity": "쏘쏘",
       "createdDt": "2019-11-28, 22:00",
       "modifiedDt": "2019-11-28, 23:00"
      },
      {
       "postId": "2",
       "paragraph": "내일의 일기도 이러쿵 저러쿵 저리 쾅쾅쾅",
       "affectivity": "기쁨",
       "createdDt": "2019-11-29, 20:00",
       "modifiedDt": ""
      }
     ])
  });

//GET
router.get('/:postId',
(req, res) => {
  res.json(
    {
     "postId": "2",
     "paragraph": "내일의 일기도 이러쿵 저러쿵 저리 쾅쾅쾅",
     "affectivity": "기쁨",
     "createdDt": "2019-11-29, 20:00",
     "modifiedDt": ""
    }
   )
});

//DELETE
router.delete('/:postId',
(req, res) => {
  res.json( 
    {
    }
   )
});

//POST
router.post('/posts',
(req, res) => {
  console.log(req.body);
  res.json(
    {   
    }
   )
});

module.exports = router;