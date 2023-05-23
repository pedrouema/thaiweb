

const express = require('express')
const router = require('./router')

const app = express();

const cors = require('cors')

const SECRET = 'S3CRet_RT_F1gTH_C3nTer';

const validarJWT = (req, res, next) => {
    if(req.path === '/login')
        next()
    else{
        let jwt = req.headers["authorization"];
        if(jwt)
            jwt = jwt.split(' ')[1]

        // Efetuando a validação do JWT:
        const jwtService = require("jsonwebtoken");
        jwtService.verify(jwt, SECRET, (err, userInfo) => {
            if (err) {
                res.status(403).end();
                return;
            }
            next();
        });
    }
    
};

app.use(express.json());
app.use(cors());
app.use(validarJWT)
app.use(router);



module.exports = app;