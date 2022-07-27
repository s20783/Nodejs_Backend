const repository = require('../repository/mysql2/KlubRepository');

exports.showKlubyList2 = (req, res, next) => {
    repository.getKluby().then(
        obj => {
            res.status(200).json(obj);
        }).catch(err => {
        console.log(err);
    });
}
exports.showKlubDetails2 = (req, res, next) => {
    const klubID = req.params.klubID;
    repository.getKlubDetails(klubID).then(
        obj => {
            if (!obj) {
                res.status(404).json({
                    message: 'Nie ma klubu o ID ' + klubID
                });
            } else {
                res.status(200).json(obj);
            }
        }).catch(err => {
        console.log(err);
    });
}
exports.showKlubInfo2 = (req, res, next) => {
    const klubID = req.params.klubID;
    repository.getKlubById(klubID).then(
        obj => {
            if (!obj) {
                res.status(404).json({
                    message: 'Nie ma klubu o ID ' + klubID
                });
            } else {
                res.status(200).json(obj);
            }
        }).catch(err => {
        console.log(err);
    });
}
exports.klubyAdd2 = (req, res, next) => {
    const data = {...req.body};
    repository.addKlub(data).then(
        obj => {
            res.status(200).json("najs");
        }
    ).catch(err => {
        res.status(500).json(err);
    });
}
exports.klubyEdit2 = (req, res, next) => {
    const klubID = req.params.klubID;
    const data = {...req.body};
    repository.editKlub(data, klubID).then(
        obj => {
            res.status(201).json("good job");
        }
    ).catch(err => {
        res.status(500).json({message: err});
    });
}
exports.klubyDelete2 = (req, res, next) => {
    const klubID = req.params.klubID;
    repository.deleteKlub(klubID).then(
        obj => {
            res.status(200).json({message: "GG"});
        }
    ).catch(err => {
        res.status(500).json(err);
    });
}






exports.showKlubyList = (req, res, next) => {
    repository.getKluby().then(
        obj => {
            res.render('pages/kluby/Kluby-list', {
                kluby: obj,
                navLocation: 'kluby'});
        }).catch(err => {
        console.log(err);
    });
}

exports.showKlubDetails = (req, res, next) => {
    const klubID = req.params.klubID;
    repository.getKlubDetails(klubID).then(
        obj => {
            if (!obj) {
                res.status(404).json({
                    message: 'Nie ma klubu o ID ' + klubID
                });
            } else {
                res.render('pages/kluby/Kluby-details', {
                    kluby: obj,
                    pageTitle: req.__('kluby.form.details.pageTitle'),
                    formAction: '',
                    formMode: 'details',
                    navLocation: 'kluby',
                    validationErrors: []
                });
            }
        }).catch(err => {
        console.log(err);
    });
}
exports.showKlubyEdit = (req, res, next) => {
    const klubID = req.params.klubID;
    repository.getKlubDetails(klubID).then(
        obj => {
            if (!obj) {
                res.status(404).json({
                    message: 'Nie ma klubu o ID ' + klubID
                });
            } else {
                res.render('pages/kluby/Kluby-details', {
                    kluby: obj,
                    pageTitle: req.__('kluby.form.edit.pageTitle'),
                    formAction: '/kluby/edit',
                    formMode: 'edit',
                    navLocation: 'kluby',
                    validationErrors: []
                });
            }
        }).catch(err => {
        console.log(err);
    });
}

exports.showKlubyAdd = (req, res, next) => {
    res.render('pages/kluby/Kluby-details', {
        kluby: {},
        pageTitle: req.__('kluby.form.add.pageTitle'),
        formAction: '/kluby/add',
        formMode: 'add',
        navLocation: 'kluby',
        validationErrors: []
    });
}

exports.klubyAdd = (req, res, next) => {
    const data = {...req.body};
    repository.addKlub(data).then(
        obj => {
            res.redirect('/kluby');
        }
    ).catch(err => {
        //res.status(500).json(err);
        res.render('pages/kluby/Kluby-details', {
            kluby: data,
            pageTitle: req.__('kluby.form.add.pageTitle'),
            formAction: '/kluby/add',
            formMode: 'add',
            navLocation: 'kluby',
            validationErrors: err.details
        });
    });
}

exports.klubyEdit = (req, res, next) => {
    const klubID = req.body.id;
    const data = {...req.body};
    repository.editKlub(data, klubID).then(
        obj => {
            res.redirect('/kluby');
        }
    ).catch(err => {
        // res.status(500).json(err);
        res.render('pages/kluby/Kluby-details', {
            kluby: data,
            pageTitle: req.__('kluby.form.edit.pageTitle'),
            formAction: '/kluby/edit',
            formMode: 'edit',
            navLocation: 'kluby',
            validationErrors: err.details
        });
    });
}

exports.klubyDelete = (req, res, next) => {
    const klubID = req.params.klubID;
    repository.deleteKlub(klubID).then(
        obj => {
            res.redirect('/kluby');
        }
    ).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

