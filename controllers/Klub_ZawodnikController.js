const repository = require('../repository/mysql2/Klub_ZawodnikRepository');

exports.showKlub_ZawodnikList2 = (req, res, next) => {
    repository.getKlubZawodnik().then(
        obj => {
            res.status(200).json(obj);
        }).catch(err => {
            res.status(500).json(err);
    });
}
exports.showKlub_ZawodnikDetails2 = (req, res, next) => {
    const klubID = req.params.klubID;
    const zawodnikID = req.params.zawodnikID;
    let kluby, zawodnicy;
    repository.getKluby().then(
        klubyObj => {
            kluby = klubyObj;
            return repository.getZawodnicy();
        }).then(
        zawodnicyObj => {
            zawodnicy = zawodnicyObj;
            return repository.getKlubZawodnikDetails(klubID, zawodnikID);
        }).then(
        obj => {
            if (!obj) {
                res.status(404).json({
                    message: 'Nie ma takiego zawodnika w klubie'
                });
            } else {
                res.status(200).json({
                    details: obj,
                    kluby: kluby,
                    zawodnicy: zawodnicy
                });
            }
        }).catch(err => {
        console.log(err);
    });
}
exports.showKlub_ZawodnikAdd2 = (req, res, next) => {
    let kluby, zawodnicy;
    repository.getKluby().then(
        klubyObj => {
            kluby = klubyObj;
            return repository.getZawodnicy();
        }).then(
        zawodnicyObj => {
            zawodnicy = zawodnicyObj;
            res.status(200).json({
                kluby: kluby,
                zawodnicy: zawodnicy
            });
        }).catch(err => {
        console.log(err);
    });
}
exports.showKlub_ZawodnikEdit2 = (req, res, next) => {
    const klub_zawodnikID = req.params.klubZawodnikID;
    let kluby, zawodnicy;
    repository.getKluby().then(
        klubyObj => {
            kluby = klubyObj;
            return repository.getZawodnicy();
        }).then(
        zawodnicyObj => {
            zawodnicy = zawodnicyObj;
            return repository.getKlubZawodnikByID(klub_zawodnikID);
        }).then(
        obj => {
            if (!obj) {
                res.status(404).json({
                    message: 'Nie ma takiego zawodnika w klubie'
                });
            } else {
                res.status(200).json({
                    details: obj,
                    kluby: kluby,
                    zawodnicy: zawodnicy
                });
            }
        }).catch(err => {
        console.log(err);
    });
}
exports.klub_ZawodnikAdd2 = (req, res, next) => {
    const data = {...req.body};
    repository.addKlubZawodnik(data).then(
        obj => {
            res.status(200).json('Dodano zawodnika do klubu');
        }
    ).catch(err => {
        res.status(500).json(err);
    });
}
exports.klub_ZawodnikEdit2 = (req, res, next) => {
    const data = {...req.body};
    const klubZawodnikID = req.params.klubZawodnikID;
    repository.editKlubZawodnik(data, klubZawodnikID).then(
        obj => {
            res.status(200).json("pomyślnie edytowano zawodnika w klubie");
        }
    ).catch(err => {
        res.status(401).json(err);
    });
}
exports.klub_ZawodnikDelete2 = (req, res, next) => {
    const klubZawodnikID = req.params.klubZawodnikID;
    repository.deleteKlubZawodnik(klubZawodnikID).then(
        obj => {
            res.status(200).json({message: 'usunięto zawodnika z klubu'});
        }
    ).catch(err => {
        res.status(500).json(err);
    });
}







exports.showKlub_ZawodnikList = (req, res, next) => {
    repository.getKlubZawodnik().then(
        obj => {
            res.render('pages/klub_zawodnik/Klub-Zawodnik-list', {
                kzy: obj,
                navLocation: 'klub_zawodnik'
            });
        }).catch(err => {
        console.log(err);
    });
}

exports.showKlub_ZawodnikDetails = (req, res, next) => {
    const klubID = req.params.klubID;
    const zawodnikID = req.params.zawodnikID;
    let kluby, zawodnicy;
    repository.getKluby().then(
        klubyObj => {
            kluby = klubyObj;
            return repository.getZawodnicy();
        }).then(
        zawodnicyObj => {
            zawodnicy = zawodnicyObj;
            return repository.getKlubZawodnikDetails(klubID, zawodnikID);
        }).then(
        obj => {
            if (!obj) {
                res.status(404).json({
                    message: 'Nie ma takiego zawodnika w klubie'
                });
            } else {
                res.render('pages/klub_zawodnik/Klub-Zawodnik-details', {
                    kzy: obj,
                    pageTitle: req.__('klub_zawodnik.form.details.pageTitle'),
                    klubyAll: kluby,
                    zawodnicyAll: zawodnicy,
                    formAction: '',
                    formMode: 'details',
                    navLocation: 'klub_zawodnik',
                    validationErrors: []
                });
            }
        }).catch(err => {
        console.log(err);
    });
}

exports.showKlub_ZawodnikEdit = (req, res, next) => {
    const klubZawodnikID = req.params.klubZawodnikID;
    let kluby, zawodnicy;
    repository.getKluby().then(
        klubyObj => {
            kluby = klubyObj;
            return repository.getZawodnicy();
        }).then(
        zawodnicyObj => {
            zawodnicy = zawodnicyObj;
            return repository.getKlubZawodnikByID(klubZawodnikID);
        }).then(
        obj => {
            if (!obj) {
                res.status(404).json({
                    message: 'Nie ma takiego zawodnika w klubie'
                });
            } else {
                res.render('pages/klub_zawodnik/Klub-Zawodnik-form', {
                    kzy: obj,
                    pageTitle: req.__('klub_zawodnik.form.edit.pageTitle'),
                    klubyAll: kluby,
                    zawodnicyAll: zawodnicy,
                    formAction: '/klub_zawodnik/edit',
                    formMode: 'edit',
                    navLocation: 'klub_zawodnik',
                    validationErrors: []
                });
            }
        }).catch(err => {
        console.log(err);
    });
}

exports.showKlub_ZawodnikAdd = (req, res, next) => {
    let kluby, zawodnicy;
    repository.getKluby().then(
        klubyObj => {
            kluby = klubyObj;
            return repository.getZawodnicy();
        }).then(
        zawodnicyObj => {
            zawodnicy = zawodnicyObj;
            res.render('pages/klub_zawodnik/Klub-Zawodnik-form', {
                kzy: {},
                pageTitle: req.__('klub_zawodnik.form.add.pageTitle'),
                klubyAll: kluby,
                zawodnicyAll: zawodnicy,
                formAction: '/klub_zawodnik/add',
                formMode: 'add',
                navLocation: 'klub_zawodnik',
                validationErrors: []
            });
        }).catch(err => {
        console.log(err);
    });
}

exports.klub_ZawodnikAdd = (req, res, next) => {
    const data = {...req.body};
    repository.addKlubZawodnik(data).then(
        obj => {
            res.redirect('/klub_zawodnik');
            //res.status(201).json({message: 'Dodano zawodnika do klubu', info: obj});
        }
    ).catch(err => {
        //res.status(500).json(err);
        let kluby, zawodnicy;
        repository.getKluby().then(
            klubyObj => {
                kluby = klubyObj;
                return repository.getZawodnicy();
            }).then(
            zawodnicyObj => {
                zawodnicy = zawodnicyObj;
                res.render('pages/klub_zawodnik/Klub-Zawodnik-form', {
                    kzy: data,
                    pageTitle: req.__('klub_zawodnik.form.add.pageTitle'),
                    klubyAll: kluby,
                    zawodnicyAll: zawodnicy,
                    formAction: '/klub_zawodnik/add',
                    formMode: 'add',
                    navLocation: 'klub_zawodnik',
                    validationErrors: err.details
                });
                //res.status(201).json(err);
            });
    });
}

exports.klub_ZawodnikEdit = (req, res, next) => {
    const data = {...req.body};
    const klubZawodnikID = req.body.id;
    repository.editKlubZawodnik(data, klubZawodnikID).then(
        obj => {
            res.redirect('/klub_zawodnik');
        }
    ).catch(err => {
        let kluby, zawodnicy;
        repository.getKluby().then(
            klubyObj => {
                kluby = klubyObj;
                return repository.getZawodnicy();
            }).then(
            zawodnicyObj => {
                zawodnicy = zawodnicyObj;
                res.render('pages/klub_zawodnik/Klub-Zawodnik-form', {
                    kzy: data,
                    pageTitle: req.__('klub_zawodnik.form.edit.pageTitle'),
                    klubyAll: kluby,
                    zawodnicyAll: zawodnicy,
                    formAction: '/klub_zawodnik/edit',
                    formMode: 'edit',
                    navLocation: 'klub_zawodnik',
                    validationErrors: err.details
                });
                //res.status(201).json(err);
            });
    });
}

exports.klub_ZawodnikDelete = (req, res, next) => {
    const klubZawodnikID = req.params.klubZawodnikID;
    repository.deleteKlubZawodnik(klubZawodnikID).then(
        obj => {
            res.redirect('/klub_zawodnik');
            //res.status(200).json({message: 'Usunięto zawodnika z klubu', info: obj});
        }
    ).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}