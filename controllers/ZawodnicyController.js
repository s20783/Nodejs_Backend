const repository = require('../repository/mysql2/ZawodnikRepository');

exports.showZawodnicyList2 = (req, res, next) => {
    repository.getZawodnicy().then(
        obj => {
            res.status(200).json(obj);
        }).catch(err => {
        console.log(err);
    });
}
exports.showZawodnicyDetails2 = (req, res, next) => {
    const zawodnikID = req.params.zawodnikID;
    repository.getZawodnikDetails(zawodnikID).then(
        obj => {
            if (!obj) {
                res.status(404).json({
                    message: 'Nie ma zawodnika o ID ' + zawodnikID
                });
            } else {
                res.status(200).json(obj);
            }
        }).catch(err => {
        console.log(err);
    });
}
exports.showZawodnicyInfo2 = (req, res, next) => {
    const zawodnikID = req.params.zawodnikID;
    repository.getZawodnikInfo(zawodnikID).then(
        obj => {
            if (!obj) {
                res.status(404).json({
                    message: 'Nie ma zawodnika o ID ' + zawodnikID
                });
            } else {
                res.status(200).json(obj);
            }
        }).catch(err => {
        console.log(err);
    });
}
exports.zawodnicyAdd2 = (req, res, next) => {
    const data = { ...req.body };
    repository.addZawodnik(data).then(
        obj => {
            res.status(200).json("super");
        }
    ).catch(err => {
        res.status(500).json(err);
    });
}
exports.zawodnicyEdit2 = (req, res, next) => {
    const data = { ...req.body };
    const zawodnikID = req.params.zawodnikID;
    repository.editZawodnik(data, zawodnikID).then(
        obj => {
            res.status(201).json("bravo");
        }
    ).catch(err => {
        res.status(500).json(err);
    });
}
exports.zawodnicyDelete2 = (req, res, next) => {
    const zawodnikID = req.params.zawodnikID;
    repository.deleteZawodnik(zawodnikID).then(
        obj => {
            res.status(200).json({message: 'zawodnik usunięty pomyślnie'})
        }
    ).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}






exports.showZawodnicyList = (req, res, next) => {
    repository.getZawodnicy().then(
        obj => {
            res.render('pages/zawodnicy/Zawodnicy-list', { zawodnicy: obj, navLocation: 'zawodnicy'});
            //res.status(200).json(obj);
        }).catch(err => {
        console.log(err);
    });
}

exports.showZawodnicyDetails = (req, res, next) => {
    const zawodnikID = req.params.zawodnikID;
    repository.getZawodnikDetails(zawodnikID).then(
        obj => {
            if (!obj) {
                res.status(404).json({
                    message: 'Nie ma zawodnika o ID ' + zawodnikID
                });
            } else {
                res.render('pages/zawodnicy/Zawodnicy-details', {
                    zawodnicy: obj,
                    pageTitle: req.__('zawodnicy.form.details.pageTitle'),
                    formAction: '',
                    formMode: 'details',
                    navLocation: 'zawodnicy',
                    validationErrors: []
                });
                //res.status(200).json(emps);
            }
        }).catch(err => {
        console.log(err);
    });
}

exports.showZawodnikEdit = (req, res, next) => {
    const zawodnikID = req.params.zawodnikID;
    repository.getZawodnikDetails(zawodnikID).then(
        obj => {
            if (!obj) {
                res.status(404).json({
                    message: 'Nie ma zawodnika o ID ' + zawodnikID
                });
            } else {
                res.render('pages/zawodnicy/Zawodnicy-details', {
                    zawodnicy: obj,
                    pageTitle: req.__('zawodnicy.form.edit.pageTitle'),
                    formAction: '/zawodnicy/edit',
                    formMode: 'edit',
                    navLocation: 'zawodnicy',
                    validationErrors: []
                });
            }
        }).catch(err => {
        console.log(err);
    });
}

exports.showZawodnikAdd = (req, res, next) => {
    res.render('pages/zawodnicy/Zawodnicy-details', {
        zawodnicy: { },
        pageTitle: req.__('zawodnicy.form.add.pageTitle'),
        formAction: '/zawodnicy/add',
        formMode: 'add',
        navLocation: 'zawodnicy',
        validationErrors: []
    });
}

exports.zawodnicyAdd = (req, res, next) => {
    const data = { ...req.body };
    repository.addZawodnik(data).then(
        obj => {
            res.redirect('/zawodnicy');
            //res.status(200).json(obj);
        }
    ).catch(err => {
        res.render('pages/zawodnicy/Zawodnicy-details', {
            zawodnicy: data,
            pageTitle: req.__('zawodnicy.form.add.pageTitle'),
            formAction: '/zawodnicy/add',
            formMode: 'add',
            navLocation: 'zawodnicy',
            validationErrors: err.details
        });
        //res.status(200).json(err);
    });
}

exports.zawodnicyEdit = (req, res, next) => {
    const data = { ...req.body };
    const zawodnikID = req.body.id;
    repository.editZawodnik(data, zawodnikID).then(
        obj => {
            res.redirect('/zawodnicy');
        }
    ).catch(err => {
        res.render('pages/zawodnicy/Zawodnicy-details', {
            zawodnicy: data,
            pageTitle: req.__('zawodnicy.form.edit.pageTitle'),
            formAction: '/zawodnicy/edit',
            formMode: 'edit',
            navLocation: 'zawodnicy',
            validationErrors: err.details
        });
    });
}

exports.zawodnicyDelete = (req, res, next) => {
    const zawodnikID = req.params.zawodnikID;
    repository.deleteZawodnik(zawodnikID).then(
        obj => {
            res.redirect('/zawodnicy');
        }
    ).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}