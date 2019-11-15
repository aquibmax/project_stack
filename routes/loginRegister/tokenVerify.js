const jwt = require('jsonwebtoken')
const dbLogin = require('../../models/userLogin')


module.exports = (req, res, next) => {
    token = req.headers['token']
    if(token){
        jwt.verify(token, req.app.get('secretKey'), (err, decoded) =>{
            console.log('>>>>>>>>>>>>>>>>>>>',decoded)
            if(err){
                res.json({
                    success: false,
                    msg: 'something went wrong or token expired'
                })
            }else if(decoded.userName){ //check, for email verication during register
                req.decoded = decoded
                next()
            }else{
                dbLogin.findOne({email: decoded.email}, (err, login) => {
                    if(err){
                        res.json({
                            success: false,
                            msg: 'DB_ERROR' 
                        })
                    }else if(login && login.token == req.headers['token']){
                        req.decoded = decoded
                        next()
                    }else{
                        res.json({
                            success: true,
                            msg: 'unauthorized token'
                        })
                    }
                })
            }
    })
    }else{
        res.json({
            success: false,
            msg: "token not found"
        })
    }
}