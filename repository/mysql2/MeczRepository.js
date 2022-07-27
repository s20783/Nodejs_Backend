const db = require('../../config/mysql2/db');
const meczSchema = require('../../model/joi/Mecz');

checkKluby = (id1, id2) => {
    const sql = `SELECT COUNT(1) AS c FROM Klub Where ID_klub = ? OR ID_klub =?`;
    promise = db.promise().query(sql, [id1, id2]);
    return promise.then((results, fields) => {
        const count = results[0][0].c;
        let err = null;
        if (count < 2) {
            err = {
                details: [{
                    path: ['Gosc'],
                    message: "Błąd, wybierz inny klub"
                }]
            };
        }
        return err;
    });
}

exports.getMecze = () => {
    return db.promise().query('SELECT ID_mecz, k1.Nazwa AS Gospodarz, CONCAT(Wynik_gospodarz, \':\', Wynik_gosc) AS Wynik, k2.Nazwa as Gosc, Data_meczu, s.Nazwa_sezonu as Sezon FROM Mecz m, Klub k1, Klub k2, Sezon s Where k1.ID_klub = m.Gospodarz AND k2.ID_klub = m.Gosc AND s.ID_sezon = m.ID_sezon Order by m.ID_sezon DESC, Data_meczu DESC')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getMeczDetails = (ID_mecz) => {
    const sql = 'SELECT k1.Nazwa AS Gospodarz, CONCAT(Wynik_gospodarz, \':\', Wynik_gosc) AS Wynik, k2.Nazwa as Gosc, Data_meczu, s.Nazwa_sezonu, s.ID_sezon, Gospodarz AS ID1, Gosc AS ID2 FROM Mecz m, Klub k1, Klub k2, Sezon s Where k1.ID_klub = m.Gospodarz AND k2.ID_klub = m.Gosc AND s.ID_sezon = m.ID_sezon AND m.ID_mecz = ?';
    return db.promise().execute(sql, [ID_mecz])
        .then((results, fields) => {
            const row = results[0][0];
            //var x = new Date(row.Data_meczu.getTime() + (60 * 60 * 1000))
            if (!row) {
                return '';
            } else {
                if(!row.Data_meczu){
                    return {
                        Gospodarz: row.ID1,
                        Gosc: row.ID2,
                        GospodarzNazwa: row.Gospodarz,
                        GoscNazwa: row.Gosc,
                        Wynik: row.Wynik,
                        Data_meczu: undefined,
                        ID_mecz: ID_mecz,
                        Sezon: row.ID_sezon,
                        Nazwa_sezonu: row.Nazwa_sezonu
                    };
                } else {
                    return {
                        Gospodarz: row.ID1,
                        Gosc: row.ID2,
                        GospodarzNazwa: row.Gospodarz,
                        GoscNazwa: row.Gosc,
                        Wynik: row.Wynik,
                        Data_meczu: row.Data_meczu.toISOString().split('.')[0],
                        ID_mecz: ID_mecz,
                        Sezon: row.ID_sezon,
                        Nazwa_sezonu: row.Nazwa_sezonu
                    };
                }
            }
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getZawodnicyGospodarz = (ID_mecz) => {
    const sql = 'SELECT Imie, Nazwisko, Pozycja, Numer, Gole, Asysty, z.ID_zawodnik FROM Zawodnik z, Klub k, Klub_zawodnik kz, Mecz m, Zawodnik_Mecz zm ' +
        'Where k.ID_klub = kz.ID_klub AND z.ID_zawodnik = kz.ID_zawodnik AND m.Gospodarz = k.ID_klub AND kz.Od_kiedy < m.Data_meczu AND (kz.Do_kiedy IS NULL OR kz.Do_kiedy > m.Data_meczu) AND z.ID_zawodnik = zm.ID_zawodnik AND zm.ID_mecz = m.ID_mecz AND m.ID_mecz = ?';
    return db.promise().execute(sql, [ID_mecz])
        .then((results, fields) => {
            const row = results[0][0];
            if (!row) {
                return '';
            } else {
                const xList = [];
                for (let i = 0; i < results[0].length; i++) {
                    const row = results[0][i];
                    const x = {
                        Imie: row.Imie,
                        Nazwisko: row.Nazwisko,
                        Pozycja: row.Pozycja,
                        Numer: row.Numer,
                        Gole: row.Gole,
                        Asysty: row.Asysty,
                        ID_zawodnik: row.ID_zawodnik
                    }
                    xList.push(x);
                }
                console.log(xList);
                return xList;
            }
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getZawodnicyGosc = (ID_mecz) => {
    const sql = 'SELECT Imie, Nazwisko, Pozycja, Numer, Gole, Asysty, z.ID_zawodnik FROM Zawodnik z, Klub k, Klub_zawodnik kz, Mecz m, Zawodnik_Mecz zm ' +
        'Where k.ID_klub = kz.ID_klub AND z.ID_zawodnik = kz.ID_zawodnik AND m.Gosc = k.ID_klub AND kz.Od_kiedy < m.Data_meczu AND (kz.Do_kiedy IS NULL OR kz.Do_kiedy > m.Data_meczu) AND z.ID_zawodnik = zm.ID_zawodnik AND zm.ID_mecz = m.ID_mecz AND m.ID_mecz = ?';
    return db.promise().execute(sql, [ID_mecz])
        .then((results, fields) => {
            const row = results[0][0];
            if (!row) {
                return '';
            } else {
                const xList = [];
                for (let i = 0; i < results[0].length; i++) {
                    const row = results[0][i];
                    const x = {
                        Imie: row.Imie,
                        Nazwisko: row.Nazwisko,
                        Pozycja: row.Pozycja,
                        Numer: row.Numer,
                        Gole: row.Gole,
                        Asysty: row.Asysty,
                        ID_zawodnik: row.ID_zawodnik
                    }
                    xList.push(x);
                }
                console.log(xList);
                return xList;
            }
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getKluby = () => {
    const sql = 'SELECT ID_klub, Nazwa, Skrot FROM Klub';
    return db.promise().query(sql).then((results, fields) => {
        console.log(results[0]);
        return results[0];
    }).catch(err => {
        console.log(err);
        throw err;
    });
}
exports.getSezony = () => {
    const sql = 'SELECT ID_sezon, Nazwa_sezonu FROM Sezon';
    return db.promise().query(sql).then((results, fields) => {
        console.log(results[0]);
        return results[0];
    }).catch(err => {
        console.log(err);
        throw err;
    });
}

exports.getSezonyById = (id) => {
    const sql = 'SELECT Nazwa_sezonu FROM Sezon where ID_sezon=?';
    return db.promise().query(sql, [id]).then((results, fields) => {
        console.log(results[0]);
        return results[0];
    }).catch(err => {
        console.log(err);
        throw err;
    });
}

exports.meczeAdd = (data) => {
    let max;
    const vres = meczSchema.validate(data, {abortEarly: false});
    if (vres.error) {
        return Promise.reject(vres.error);
    }

    // return checkKluby(data.Gospodarz, data.Gosc).then(
    //     numerErr => {
    //         if (numerErr !== null) {
    //             return Promise.reject(numerErr);
    //         } else {
                if (data.Data_meczu) {
                    const sql = 'INSERT into Mecz (Data_meczu, Gospodarz, Gosc, ID_sezon) VALUES (?, ?, ?, ?)';
                    return db.promise().execute(sql, [data.Data_meczu, data.Gospodarz, data.Gosc, data.Sezon])
                        .then(() => {
                            const sql2 = 'select max(ID_mecz) as c from Mecz';
                            promise = db.promise().query(sql2);
                            return promise.then((results, fields) => {
                                max = results[0][0].c;
                                return cursorInsert(max);
                            });
                        }).catch(err => {
                            return Promise.reject(err);
                        });
                } else {
                    const sql = 'INSERT into Mecz (Gospodarz, Gosc, ID_sezon) VALUES (?, ?, ?)';
                    return db.promise().execute(sql, [data.Gospodarz, data.Gosc, data.Sezon])
                        .then(() => {
                            const sql2 = 'select max(ID_mecz) as c from Mecz';
                            promise = db.promise().query(sql2);
                            return promise.then((results, fields) => {
                                max = results[0][0].c;
                                return cursorInsert(max);
                            });
                        }).catch(err => {
                            return Promise.reject(err);
                        });
                }
        //     }
        // })
        // .catch(err => {
        //     return Promise.reject(err);
        // });
}

exports.meczeEdit = (data, meczID) => {
    // const vres = meczSchema.validate(data, {abortEarly: false});
    // if (vres.error) {
    //     return Promise.reject(vres.error);
    // }

    // return checkKluby(data.Gospodarz, data.Gosc).then(
    //     numerErr => {
    //         if (numerErr !== null) {
    //             return Promise.reject(numerErr);
    //         } else {
                const sql1 = 'DELETE from Zawodnik_Mecz WHERE ID_mecz=?';
                const sql2 = 'Update Mecz Set ID_sezon = ?, Data_meczu = ?, Gospodarz = ?, Gosc = ? Where ID_mecz=?';
                return db.promise().execute(sql1, [meczID])
                    .then(() => {
                            return db.promise().execute(sql2, [data.Sezon, data.Data_meczu, data.Gospodarz, data.Gosc, meczID])
                                .then(() => {
                                    return cursorInsert(meczID)
                                        .then(() => {
                                        return resetWynik(meczID);
                                    })
                                })

                                .catch(err => {
                                    return Promise.reject(err);
                                });
                        }
                    );
            //}
        // })
        // .catch(err => {
        //     return Promise.reject(err);
        // });
}

resetWynik = (meczID) => {
    const sql = 'Update Mecz set Wynik_gospodarz = 0, Wynik_gosc = 0 where ID_mecz = ?';
    return db.promise().execute(sql, [meczID]);
}

exports.deleteMecz = (meczID) => {
    const sql1 = 'DELETE from Zawodnik_Mecz WHERE ID_mecz=?';
    const sql2 = 'DELETE from Mecz WHERE ID_mecz=?';

    return db.promise().execute(sql1, [meczID])
        .then(() => {
                return db.promise().execute(sql2, [meczID])
            }
        );
};

cursorInsert = (meczID) => {
    const sql = 'Call cursor1(?);';
    return db.promise().execute(sql, [meczID]);
}

cursorInsert = (meczID) => {
    const sql = 'Call cursor1(?);';
    return db.promise().execute(sql, [meczID]);
}

exports.cursorGosc = (meczID) => {
    const sql = 'Call cursorWynikGosc(?);';
    return db.promise().execute(sql, [meczID]);
}

exports.golePlus = (value, value2) => {
    const sql = 'Update Zawodnik_Mecz Set Gole = Gole + 1 Where ID_mecz = ? AND ID_zawodnik = ?';
    const sql2 = 'Call cursorWynikGospodarz(?);';
    return db.promise().execute(sql, [value, value2])
        .then(() => {
                return db.promise().execute(sql2, [value])
            }
        ).catch(err => {
            return Promise.reject(err);
        });
}

exports.goleDown = (value, value2) => {
    const sql = 'Update Zawodnik_Mecz Set Gole = case when Gole > 0 then Gole-1 else 0 end Where ID_mecz = ? AND ID_zawodnik = ?';
    const sql2 = 'Call cursorWynikGospodarz(?);';
    return db.promise().execute(sql, [value, value2])
        .then(() => {
                return db.promise().execute(sql2, [value])
            }
        ).catch(err => {
            return Promise.reject(err);
        });
}

exports.asystyPlus = (value, value2) => {
    const sql = 'Update Zawodnik_Mecz Set Asysty = Asysty + 1 Where ID_mecz = ? AND ID_zawodnik = ?';
    return db.promise().execute(sql, [value, value2]);
}

exports.asystyDown = (value, value2) => {
    const sql = 'Update Zawodnik_Mecz Set Asysty = case when Asysty > 0 then Asysty-1 else 0 end Where ID_mecz = ? AND ID_zawodnik = ?';
    return db.promise().execute(sql, [value, value2]);
}