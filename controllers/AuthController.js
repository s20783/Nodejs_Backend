const ZawodnikRepository = require('../repository/mysql2/ZawodnikRepository');
const authUtil = require('../util/AuthUtils');

exports.login = (req,res,next) => {
    const nazwisko = req.body.loginNazwisko;
    const password = req.body.loginPassword;
    ZawodnikRepository.findZawodnik(nazwisko).then(
        obj => {
            if(!obj){
                res.render('index', {
                    navLocation: 'main',
                    loginError: req.__('logging.LoggingError')
                })
            } else if (authUtil.comparePasswords(password, obj.Password)){
                req.session.loggedUser = obj;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: 'main',
                    loginError: req.__('logging.LoggingError')
                })
            }
        }
    ).catch(err => {
        console.log(err);
    });
}

exports.logout = (req,res,next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}