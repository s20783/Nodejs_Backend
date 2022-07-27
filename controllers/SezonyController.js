const repository = require('../repository/mysql2/SezonRepository');

exports.showSezonyList2 = (req, res, next) => {
    repository.getSezony().then(
        obj => {
            res.status(200).json(obj);
        }).catch(err => {
        res.status(500).json(err);
    });
}
exports.showSezonyTable = (req, res, next) => {
    const id = req.params.sezonID;
    repository.getSezonTable(id).then(
        obj => {
            res.status(200).json(obj);
        }).catch(err => {
        res.status(500).json(err);
    });
}
exports.showSezonyDetails2 = (req, res, next) => {
    const id = req.params.sezonID;
    let sezon, gole, asysty;
    repository.getSezonById(id).then(
        obj => {
            sezon = obj;
            return repository.getGoleTable(id);
        }).then(goleObj => {
        gole = goleObj;
        return repository.getAsystyTable(id);
    }).then(asystyObj => {
        asysty = asystyObj;
        return repository.getSezonTable(id);
    }).then(stats => {
        res.status(200).json({
            sezon: sezon,
            stats: stats,
            gole: gole,
            asysty: asysty
        })
    }).catch(err => {
        console.log(err);
    });
}
exports.sezonyAdd2 = (req, res, next) => {
    const data = {...req.body};
    repository.addSezon(data).then(
        obj => {
            res.status(200).json("Season added");
        }).catch(err => {
        res.status(500).json(err);
    });
}
exports.sezonyEdit2 = (req, res, next) => {
    const data = {...req.body};
    const id = req.params.sezonID;
    repository.editSezon(data, id).then(
        obj => {
            res.status(200).json("Season edited");
        }).catch(err => {
        res.status(500).json(err);
    });
}
exports.sezonyDelete2 = (req, res, next) => {
    const id = req.params.sezonID;
    repository.deleteSezon(id).then(
        obj => {
            res.status(200).json({message: 'usunięto sezon'});
        }).catch(err => {
        res.status(500).json(err);
    });
}





exports.showSezonyList = (req, res, next) => {
    repository.getSezony().then(
        obj => {
            res.render('pages/sezony/Sezony-list', {
                sezony: obj,
                pageTitle: req.__('sezony.form.list.pageTitle'),
                navLocation: 'sezony'
            });
        }).catch(err => {
        console.log(err);
    });
}
exports.showSezonyEdit = (req, res, next) => {
    const id = req.params.sezonID;
    repository.getSezonById(id).then(
        obj => {
            res.render('pages/sezony/Sezony-form', {
                sezony: obj,
                pageTitle: req.__('sezony.form.edit.pageTitle'),
                formAction: '/sezony/edit',
                formMode: 'edit',
                navLocation: 'sezony',
                validationErrors: []
            });
        }).catch(err => {
        console.log(err);
    });
}

exports.showSezonyDetails = (req, res, next) => {
    const id = req.params.sezonID;
    let sezon, gole, asysty;
    repository.getSezonById(id).then(
        obj => {
            sezon = obj;
            return repository.getGoleTable(id);
        }).then(goleObj => {
        gole = goleObj;
        return repository.getAsystyTable(id);
    }).then(asystyObj => {
        asysty = asystyObj;
        return repository.getSezonTable(id);
    }).then(stats => {
        res.render('pages/sezony/Sezony-details', {
            sezony: sezon,
            stats: stats,
            gole: gole,
            asysty: asysty,
            pageTitle: req.__('sezony.form.details.pageTitle'),
            formAction: '',
            formMode: 'edit',
            navLocation: 'sezony',
            validationErrors: []
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.showSezonyAdd = (req, res, next) => {
    res.render('pages/sezony/Sezony-form', {
        sezony: {},
        pageTitle: req.__('sezony.form.add.pageTitle'),
        formAction: '/sezony/add',
        formMode: 'add',
        navLocation: 'sezony',
        validationErrors: []
    });
}

exports.sezonyAdd = (req, res, next) => {
    const data = {...req.body};
    repository.addSezon(data).then(
        obj => {
            res.redirect('/sezony');
        }).catch(err => {
        //res.status(200).json(err.details);
        res.render('pages/sezony/Sezony-form', {
            sezony: data,
            pageTitle: req.__('sezony.form.add.pageTitle'),
            formAction: '/sezony/add',
            formMode: 'add',
            navLocation: 'sezony',
            validationErrors: err.details
        });
    });
}

exports.sezonyEdit = (req, res, next) => {
    const data = {...req.body};
    const id = req.body.id;
    repository.editSezon(data, id).then(
        obj => {
            res.redirect('/sezony');
        }).catch(err => {
        res.render('pages/sezony/Sezony-form', {
            sezony: data,
            pageTitle: req.__('sezony.form.edit.pageTitle'),
            formAction: '/sezony/edit',
            formMode: 'edit',
            navLocation: 'sezony',
            validationErrors: err.details
        });
    });
}

exports.sezonyDelete = (req, res, next) => {
    const id = req.params.sezonID;
    repository.deleteSezon(id).then(
        obj => {
            res.redirect('/sezony');
        }).catch(err => {
        console.log(err);
    });
}
