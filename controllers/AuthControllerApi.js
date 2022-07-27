const ZawodnikRepository = require('../repository/mysql2/ZawodnikRepository');
const authUtil = require('../util/AuthUtils');
const config = require("../config/auth/key")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = (req,res,next) => {
    const nazwisko = req.body.Nazwisko;
    const password = req.body.Password;
    ZawodnikRepository.findZawodnik(nazwisko)
        .then(obj => {
            if(!obj){
                return res.status(401).send({message: "błąd"})
            }
            bcrypt.compare(password, obj.Password)
                .then(isEqual => {
                    if(!isEqual) {
                        return res.status(401).send({message: "błąd"})
                    }
                    const token = jwt.sign(
                        {
                            nazwisko: obj.Nazwisko,
                            id: obj.ID_zawodnik,
                        },
                        config.secret,
                        {expiresIn: '1h' }
                    )
                    res.status(200).json({token: token, id: obj.ID_zawodnik, Imie: obj.Imie,
                        Nazwisko: obj.Nazwisko, Rola: obj.Rola, Kapitan: obj.Kapitan})
                })
                .catch(err => {
                    res.status(501)
                })

        })
}

exports.logout = (req,res,next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}