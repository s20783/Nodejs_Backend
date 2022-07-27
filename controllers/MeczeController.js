const repository = require('../repository/mysql2/MeczRepository');

exports.showMeczeList2 = (req, res, next) => {
    repository.getMecze().then(
        obj => {
            res.status(200).json(obj);
        }).catch(err => {
            res.status(500).json(err);
    });
}
exports.showMeczeDetails2 = (req, res, next) => {
    const meczId = req.params.meczID;
    let gospodarze, goscie, sezony, kluby;
    repository.getZawodnicyGospodarz(meczId).then(
        gospodarzObj => {
            gospodarze = gospodarzObj;
            return repository.getZawodnicyGosc(meczId);
        }).then(
        goscObj => {
            goscie = goscObj;
            return repository.getSezony();
        }).then(
        sezonyObj => {
            sezony = sezonyObj;
            return repository.getKluby();
        }).then(
        klubyObj => {
            kluby = klubyObj;
            return repository.getMeczDetails(meczId);
        }).then(
        obj => {
            res.status(200).json({
                mecze: obj,
                kluby: kluby,
                gospodarze: gospodarze,
                goscie: goscie,
                sezony: sezony
            });

        }).catch(err => {
        console.log(err);
    });
}
exports.showMeczeAdd2 = (req, res, next) => {
    let kluby;
    repository.getKluby().then(
        klubyObj => {
            kluby = klubyObj;
            return repository.getSezony().then(
                sezony => {
                    res.status(200).json({
                        kluby: kluby,
                        sezony: sezony
                    });
                }
            )
        });
}
exports.showMeczeEdit2 = (req, res, next) => {
    const meczId = req.params.meczID;
    let kluby, sezony, gospodarz, goscie;
    repository.getKluby().then(
        klubyObj => {
            kluby = klubyObj;
            return repository.getSezony().then(
                sezonyObj => {
                    sezony = sezonyObj;
                    return repository.getZawodnicyGosc(meczId);
                }).then(
                goscObj => {
                    goscie = goscObj;
                    return repository.getZawodnicyGospodarz(meczId);
                }).then(
                gospodarzObj => {
                    gospodarz = gospodarzObj;
                    return repository.getMeczDetails(meczId);
                }).then(
                obj => {
                    res.status(200).json({
                        mecze: obj,
                        kluby: kluby,
                        sezony: sezony,
                        gospodarze: gospodarz,
                        goscie: goscie
                    });
                }
            )
        });
}
exports.meczeAdd2 = (req, res, next) => {
    const data = {...req.body};
    repository.meczeAdd(data).then(
        obj => {
            res.status(200).json(obj);
        }
    ).catch(err => {
        res.status(500).json(err);
    });
}
exports.meczeEdit2 = (req, res, next) => {
    const data = {...req.body};
    const meczId = req.params.meczID;
    repository.meczeEdit(data, meczId).then(
        obj => {
            res.status(200).json("Pomyślnie edytowano wynik");
        }
    ).catch(err => {
        res.status(500).json(err);
    });
}

exports.goleAdd2 = (req, res, next) => {
    const id = req.params.meczID;
    const id2 = req.params.zawodnikID;
    repository.golePlus(id,id2).then(
        obj => {
            repository.cursorGosc(id).then(
                x => {
                    res.status(200).json("");
                }
            )
        }
    ).catch(err => {
        res.status(500).json(err);
    });
}
exports.goleDown2 = (req, res, next) => {
    const id = req.params.meczID;
    const id2 = req.params.zawodnikID;
    repository.goleDown(id,id2).then(
        obj => {
            repository.cursorGosc(id).then(
                x => {
                    res.status(200).json("");
                }
            )
        }
    ).catch(err => {
        res.status(500).json(err);
    });
}

exports.asystyAdd2 = (req, res, next) => {
    const id = req.params.meczID;
    const id2 = req.params.zawodnikID;
    repository.asystyPlus(id,id2).then(
        obj => {
            res.status(200).json("");
        }
    ).catch(err => {
        res.status(500).json(err);
    });
}
exports.asystyDown2 = (req, res, next) => {
    const id = req.params.meczID;
    const id2 = req.params.zawodnikID;
    repository.asystyDown(id,id2).then(
        obj => {
            res.status(200).json("");
        }
    ).catch(err => {
        res.status(500).json(err);
    });
}
exports.meczeDelete2 = (req, res, next) => {
    const id = req.params.meczID;
    repository.deleteMecz(id).then(
        obj => {
            res.status(200).json({message:"Mecz usunięty pomyślnie"});
        }
    ).catch(err => {
        res.status(500).json(err);
    });
}











exports.showMeczeList = (req, res, next) => {
    repository.getMecze().then(
        obj => {
            res.render('pages/mecze/Mecze-list', {mecze: obj, navLocation: 'mecze'});
        }).catch(err => {
        console.log(err);
    });
}
exports.showMeczeDetails = (req, res, next) => {
    const meczId = req.params.meczID;
    let gospodarze, goscie, sezony, kluby;
    repository.getZawodnicyGospodarz(meczId).then(
        gospodarzObj => {
            gospodarze = gospodarzObj;
            return repository.getZawodnicyGosc(meczId);
        }).then(
        goscObj => {
            goscie = goscObj;
            return repository.getSezony();
        }).then(
        sezonyObj => {
            sezony = sezonyObj;
            return repository.getKluby();
        }).then(
        klubyObj => {
            kluby = klubyObj;
            return repository.getMeczDetails(meczId);
        }).then(
        obj => {
            //res.status(200).json(obj);
            res.render('pages/mecze/Mecze-details', {
                mecze: obj,
                kluby: kluby,
                gospodarze: gospodarze,
                goscie: goscie,
                sezony: sezony,
                pageTitle: req.__('mecze.form.details.pageTitle'),
                formAction: '',
                formMode: 'details',
                navLocation: 'mecze',
                validationErrors: []
            });

        }).catch(err => {
        console.log(err);
    });
}

exports.showMeczeAdd = (req, res, next) => {
    let kluby, sezony;
    repository.getKluby().then(
        klubyObj => {
            kluby = klubyObj;
            return repository.getSezony().then(
                sezony => {
                    res.render('pages/mecze/Mecze-form', {
                        mecze: {},
                        kluby: kluby,
                        sezony: sezony,
                        pageTitle: req.__('mecze.form.add.pageTitle'),
                        formAction: '/wyniki/add',
                        formMode: 'add',
                        navLocation: 'mecze',
                        validationErrors: []
                    });
                }
            )
        });
}
exports.showMeczeEdit = (req, res, next) => {
    const meczId = req.params.meczID;
    let kluby, sezony, gospodarz, goscie;
    repository.getKluby().then(
        klubyObj => {
            kluby = klubyObj;
            return repository.getSezony().then(
                sezonyObj => {
                    sezony = sezonyObj;
                    return repository.getZawodnicyGosc(meczId);
                }).then(
                goscObj => {
                    goscie = goscObj;
                    return repository.getZawodnicyGospodarz(meczId);
                }).then(
                gospodarzObj => {
                    gospodarz = gospodarzObj;
                    return repository.getMeczDetails(meczId);
                }).then(
                obj => {
                    res.render('pages/mecze/Mecze-details', {
                        mecze: obj,
                        kluby: kluby,
                        sezony: sezony,
                        gospodarze: gospodarz,
                        goscie: goscie,
                        pageTitle: req.__('mecze.form.edit.pageTitle'),
                        formAction: '/wyniki/edit',
                        formMode: 'edit',
                        navLocation: 'mecze',
                        validationErrors: []
                    });
                }
            )
        });
}

exports.meczeAdd = (req, res, next) => {
    const data = {...req.body};
    repository.meczeAdd(data).then(
        obj => {
            res.status(200).json(obj);
            //res.redirect('/wyniki');
        }
    ).catch(err => {
        res.status(500).json(err);
        let kluby;
        repository.getKluby().then(
            klubyObj => {
                kluby = klubyObj;
                return repository.getSezony().then(
                    sezony => {
                        res.render('pages/mecze/Mecze-form', {
                            mecze: data,
                            kluby: kluby,
                            sezony: sezony,
                            pageTitle: req.__('mecze.form.add.pageTitle'),
                            formAction: '/wyniki/add',
                            formMode: 'add',
                            navLocation: 'mecze',
                            validationErrors: err.details
                        });
                    }
                )
            });
    });
}
exports.meczeEdit = (req, res, next) => {
    const data = {...req.body};
    const meczId = req.body.id;
    let gospodarz, gosc
    repository.meczeEdit(data, meczId).then(
        obj => {
            //res.status(200).json(obj);
            res.redirect('/wyniki/edit/' + meczId);
        }
    ).catch(err => {
         res.status(500).json(err);
        let kluby, sezony;
        repository.getKluby().then(
            klubyObj => {
                kluby = klubyObj;
                return repository.getSezony().then(
                    sezonyObj => {
                        sezony = sezonyObj;
                        return repository.getZawodnicyGosc(meczId);
                    }).then(
                    goscObj => {
                        gosc = goscObj;
                        return repository.getZawodnicyGospodarz(meczId);
                    }).then(
                    gospodarzObj => {
                        gospodarz = gospodarzObj;
                        return repository.getMeczDetails(meczId);
                    }).then(
                    obj => {
                        res.render('pages/mecze/Mecze-details', {
                            mecze: obj,
                            kluby: kluby,
                            sezony: sezony,
                            gospodarze: gospodarz,
                            goscie: gosc,
                            pageTitle: req.__('mecze.form.edit.pageTitle'),
                            formAction: '/wyniki/edit',
                            formMode: 'edit',
                            navLocation: 'mecze',
                            validationErrors: err.details
                        });
                    }
                )
            });
    });
}

exports.meczeDelete = (req, res, next) => {
    const id = req.params.meczID;
    repository.deleteMecz(id).then(
        obj => {
            res.redirect('/wyniki');
        }
    ).catch(err => {
        res.status(500).json(err);
    });
}

exports.goleAdd = (req, res, next) => {
    const id = req.params.meczID;
    const id2 = req.params.zawodnikID;
    repository.golePlus(id,id2).then(
        obj => {
            repository.cursorGosc(id).then(
                x => {
                    res.redirect('/wyniki/edit/'+id);
                }
            )
        }
    ).catch(err => {
        res.status(500).json(err);
    });
}
exports.goleDown = (req, res, next) => {
    const id = req.params.meczID;
    const id2 = req.params.zawodnikID;
    repository.goleDown(id,id2).then(
        obj => {
            repository.cursorGosc(id).then(
                x => {
                    res.redirect('/wyniki/edit/'+id);
                }
            )
        }
    ).catch(err => {
        res.status(500).json(err);
    });
}

exports.asystyAdd = (req, res, next) => {
    const id = req.params.meczID;
    const id2 = req.params.zawodnikID;
    repository.asystyPlus(id,id2).then(
        obj => {
            res.redirect('/wyniki/edit/'+id);
        }
    ).catch(err => {
        res.status(500).json(err);
    });
}
exports.asystyDown = (req, res, next) => {
    const id = req.params.meczID;
    const id2 = req.params.zawodnikID;
    repository.asystyDown(id,id2).then(
        obj => {
            res.redirect('/wyniki/edit/'+id);
        }
    ).catch(err => {
        res.status(500).json(err);
    });
}