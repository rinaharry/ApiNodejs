const jwt = require('jsonwebtoken');


module.exports = function auth(req, res, next) {
    const token = req.header('Authorization');
    if(!token) {
        return res.status(401).send({
            status: 401,
            success: false,
            result: 'Accès refusé. Aucun token fourni.'
        });
    }

    try {
        const decoded = jwt.verify(token, 'okokok');
        req.user = decoded;
        next();
    }
    
    catch(e) {
        res.status(400).send({
            status: 400,
            success: false,
            result: 'Token invalide.'
        });
    }
}