const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../knex');
const db = knex.knex;
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth');

router.use('/check', authMiddleware);
router.get('/check', 
    (req, res) => {
        res.json({
            success: true,
            info: req.decoded
        });
    }
);

checkEmail = (email) => {
    return db
        .from('user_info')
        .select('id')
        .where('user_email', '=', email)
        .catch((err) => {
            console.error("checkEmail: " + err);
            return false;
        })
        .then(rows => {return rows == ''})
}

router.post('/user', 
    (req, res) => {
        console.log(req.body);
        bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = {
            user_email: req.body.email,
            user_password: hash,
            agree_yn: req.body.agreeYn,
            };
            console.log(user);
            checkEmail(user.email)
            .then((ok) => {
                if (! ok) {
                    console.error("email already exists")
                    res.status(400);
                    res.send({message: "email이 이미 존재합니다.",});
                    return;
                }
                db('user_info').insert(user)
                .then((resp) => {
                    console.log(resp);
                    res.send("");
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500);
                    res.send({message: err.message});
                });
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(401)
            res.send({message: err});
        });
    }
);

router.post('/token', 
    (req, res) => {
        const user = {
            user_email: req.body.email,
            user_password: req.body.password,
        };
        const secret = req.app.get('jwt-secret');

        console.log(secret);

        db
        .from('user_info')
        .select('id', 'user_email', 'user_password')
        .where('user_email', '=', user.user_email)
        .then((rows) => {
            if (! rows || rows.length == 0 ||
                ! bcrypt.compareSync(user.user_password, rows[0]['user_password'])) {
                res.status(401);
                res.send({message:'email 또는 비밀번호가 틀렸습니다.'});
                return;
            }
            jwt.sign({
                _id: rows[0]['id'],
            },
            secret,
            {
                expiresIn: '7d',
                issuer: '1sentence.ml',
                subject: 'userInfo',
            }, (err, token) => {
                if (err) throw new Error('create token failed');
                res.send({"token": token});
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(400);
            res.send({message:err.message});
        });
    }
);

module.exports = router;