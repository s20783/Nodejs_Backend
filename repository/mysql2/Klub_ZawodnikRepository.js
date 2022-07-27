const db = require('../../config/mysql2/db');
const klub_zawodnikSchema = require('../../model/joi/Klub_zawodnik');

checkNumerUnique = (Numer, ID_klub, ID_klub_zawodnik) => {
    let promise;
    if (ID_klub_zawodnik) {
        const sql = `SELECT COUNT(1) AS c FROM Klub_zawodnik Where Numer = ? AND ID_klub = ? AND ID_klub_zawodnik != ? `;
        promise = db.promise().query(sql, [Numer, ID_klub, ID_klub_zawodnik]);
    } else {
        const sql = `SELECT COUNT(1) AS c FROM Klub_zawodnik Where Numer = ? AND ID_klub = ?`;
        promise = db.promise().query(sql, [Numer, ID_klub]);
    }
    return promise.then((results, fields) => {
        const count = results[0][0].c;
        let err = null;
        if (count > 0) {
            err = {
                details: [{
                    path: ['Numer'],
                    message: 'Podany numer jest już zajęty'
                }]
            };
        }
        return err;
    });
}

exports.getKlubZawodnik = () => {
    return db.promise().query('SELECT kz.ID_klub_zawodnik, kz.ID_klub, kz.ID_zawodnik, Nazwa, Imie, Nazwisko, Skrot FROM Klub_zawodnik kz, Klub k, Zawodnik z WHERE k.ID_klub=kz.ID_klub AND z.ID_zawodnik = kz.ID_zawodnik ' +
        'GROUP BY kz.ID_klub_zawodnik, kz.ID_klub, kz.ID_zawodnik, Nazwa, Imie, Nazwisko, Skrot Order by Nazwa, Nazwisko')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getKlubZawodnikDetails = (ID_klub, ID_Zawodnik) => {
    const sql = 'SELECT kz.ID_klub_zawodnik, Nazwa, Imie, Nazwisko, Numer, Od_kiedy, Pozycja, Do_kiedy FROM Klub_zawodnik kz, Klub k, Zawodnik z WHERE k.ID_klub=kz.ID_klub AND z.ID_zawodnik = kz.ID_zawodnik AND z.ID_zawodnik = ? AND k.ID_klub = ?';
    return db.promise().execute(sql, [ID_Zawodnik, ID_klub])
        .then((results, fields) => {
            const row = results[0][0];
            if (!row) {
                return '';
            } else {
                const xList = {
                    Nazwa: row.Nazwa,
                    Imie: row.Imie,
                    Nazwisko: row.Nazwisko,
                    Pozycja: row.Pozycja,
                    ID_klub: ID_klub,
                    ID_zawodnik: ID_Zawodnik,
                    info: []
                };
                for (let i = 0; i < results[0].length; i++) {
                    const row = results[0][i];
                    const x = {
                        ID_klub_zawodnik: row.ID_klub_zawodnik,
                        Numer: row.Numer,
                        Od_kiedy: new Date(row.Od_kiedy.getTime() + (60*60*1000)).toISOString().split('T')[0],
                        Do_kiedy: row.Do_kiedy
                    }
                    xList.info.push(x);
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

exports.getZawodnicy = () => {
    const sql = 'SELECT ID_zawodnik, Imie, Nazwisko, Pozycja FROM Zawodnik';
    return db.promise().query(sql).then((results, fields) => {
        console.log(results[0]);
        return results[0];
    }).catch(err => {
        console.log(err);
        throw err;
    });
}

exports.getKlubZawodnikByID = (ID_klub_zawodnik1) => {
    const sql = 'SELECT k.ID_klub, z.ID_zawodnik, Nazwa, Imie, Nazwisko, Numer, Od_kiedy, Do_kiedy FROM Klub_zawodnik kz, Klub k, Zawodnik z WHERE k.ID_klub=kz.ID_klub AND z.ID_zawodnik = kz.ID_zawodnik AND kz.ID_klub_zawodnik = ?';
    return db.promise().execute(sql, [ID_klub_zawodnik1])
        .then((results, fields) => {
            const row = results[0][0];
            if (!row) {
                return '';
            } else {
                if(row.Do_kiedy){
                    return {
                        Nazwa: row.Nazwa,
                        Imie: row.Imie,
                        Nazwisko: row.Nazwisko,
                        Pozycja: row.Pozycja,
                        ID_klub: row.ID_klub,
                        ID_zawodnik: row.ID_zawodnik,
                        Od_kiedy: new Date(row.Od_kiedy.getTime() + (60*60*1000)).toISOString().split('T')[0],
                        Do_kiedy: new Date(row.Do_kiedy.getTime() + (60*60*1000)).toISOString().split('T')[0],
                        Numer: row.Numer,
                        ID_klub_zawodnik: ID_klub_zawodnik1
                    };
                } else {
                    return {
                        Nazwa: row.Nazwa,
                        Imie: row.Imie,
                        Nazwisko: row.Nazwisko,
                        Pozycja: row.Pozycja,
                        ID_klub: row.ID_klub,
                        ID_zawodnik: row.ID_zawodnik,
                        Od_kiedy: new Date(row.Od_kiedy.getTime() + (60*60*1000)).toISOString().split('T')[0],
                        Do_kiedy: row.Do_kiedy,
                        Numer: row.Numer,
                        ID_klub_zawodnik: ID_klub_zawodnik1
                    };
                }
            }
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.addKlubZawodnik = (data) => {
    const vres = klub_zawodnikSchema.validate(data, {abortEarly: false});
    if (vres.error) {
        return Promise.reject(vres.error);
    }
    return checkNumerUnique(data.Numer, data.ID_klub).then(
        numerErr => {
            if (numerErr !== null) {
                return Promise.reject(numerErr);
            } else {
                if (data.Do_kiedy) {
                    const sql = 'INSERT into Klub_zawodnik (ID_zawodnik, ID_klub, Numer, Od_kiedy, Do_kiedy) VALUES (?, ?, ?, ?, ?)';
                    return db.promise().execute(sql, [data.ID_zawodnik, data.ID_klub, data.Numer, data.Od_kiedy, data.Do_kiedy]);
                } else {
                    const sql = 'INSERT into Klub_zawodnik (ID_zawodnik, ID_klub, Numer, Od_kiedy) VALUES (?, ?, ?, ?)';
                    return db.promise().execute(sql, [data.ID_zawodnik, data.ID_klub, data.Numer, data.Od_kiedy]);
                }
           }
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

exports.editKlubZawodnik = (data, klubZawodnikID) => {
    const vres = klub_zawodnikSchema.validate(data, {abortEarly: false});
    if (vres.error) {
        return Promise.reject(vres.error);
    }
    return checkNumerUnique(data.Numer, data.ID_klub, klubZawodnikID).then(
        numerErr => {
            if (numerErr !== null) {
                return Promise.reject(numerErr);
            } else {
                if (data.Do_kiedy) {
                    const sql = 'UPDATE Klub_zawodnik set Numer=?, Od_kiedy=?, Do_kiedy=? WHERE ID_klub_zawodnik=?';
                    return db.promise().execute(sql, [data.Numer, data.Od_kiedy, data.Do_kiedy, klubZawodnikID]);
                } else {
                    const sql = 'UPDATE Klub_zawodnik set Numer=?, Od_kiedy=? WHERE ID_klub_zawodnik=?';
                    return db.promise().execute(sql, [data.Numer, data.Od_kiedy, klubZawodnikID]);
                }
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

exports.deleteKlubZawodnik = (klubZawodnikID) => {
    const sql = 'DELETE from Klub_zawodnik WHERE ID_klub_zawodnik=?';
    return db.promise().execute(sql, [klubZawodnikID]);
};
