const db = require('../../config/mysql2/db');
const zawodnikSchema = require('../../model/joi/Zawodnik');

exports.getZawodnicy = () => {
    return db.promise().query('SELECT ID_zawodnik, Imie, Nazwisko, Pozycja FROM Zawodnik')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getZawodnikDetails = (ID_zawodnik) => {
    const sql = 'SELECT z.ID_zawodnik, k.Nazwa, z.Imie, z.Nazwisko, z.Pozycja, kz.Numer, kz.Od_kiedy, kz.Do_kiedy, k.ID_klub FROM Zawodnik z left join Klub_zawodnik kz on z.ID_zawodnik = kz.ID_zawodnik left join Klub k on kz.ID_klub = k.ID_klub Where z.ID_zawodnik = ?';
    return db.promise().execute(sql, [ID_zawodnik])
        .then((results, fields) => {
            const row = results[0][0];
            if (!row) {
                return '';
            } else {
                const xList = {
                    ID_zawodnik: row.ID_zawodnik,
                    Imie: row.Imie,
                    Nazwisko: row.Nazwisko,
                    Pozycja: row.Pozycja,
                    info: []
                };
                for (let i = 0; i < results[0].length; i++) {
                    const row = results[0][i];
                    const x = {
                        Nazwa: row.Nazwa,
                        Numer: row.Numer,
                        Od_kiedy: row.Od_kiedy,
                        Do_kiedy: row.Do_kiedy,
                        ID_klub: row.ID_klub
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

exports.getZawodnikInfo = (ID_zawodnik) => {
    const sql = 'SELECT k.Nazwa, z.Imie, z.Nazwisko, z.Pozycja, kz.Numer, kz.Od_kiedy, kz.Do_kiedy, k.ID_klub FROM Zawodnik z left join Klub_zawodnik kz on z.ID_zawodnik = kz.ID_zawodnik left join Klub k on kz.ID_klub = k.ID_klub Where z.ID_zawodnik = ?';
    return db.promise().execute(sql, [ID_zawodnik])
        .then((results, fields) => {
            const row = results[0][0];
            if (!row) {
                return '';
            } else {
                return  {
                    ID_zawodnik: ID_zawodnik,
                    Imie: row.Imie,
                    Nazwisko: row.Nazwisko,
                    Pozycja: row.Pozycja
                }
            }
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.addZawodnik = (data) => {
    const vres = zawodnikSchema.validate(data, {abortEarly: false});
    if (vres.error) {
        return Promise.reject(vres.error);
    }
    const authUtil = require('../../util/AuthUtils');
    const hashPassword = authUtil.hashPassword('123');
    const sql = 'INSERT into Zawodnik (Imie, Nazwisko, Pozycja, Password) VALUES (?, ?, ?, ?)';
    return db.promise().execute(sql, [data.Imie, data.Nazwisko, data.Pozycja, hashPassword]);
};

exports.editZawodnik = (data, numer) => {
    const vres = zawodnikSchema.validate(data, {abortEarly: false});
    if (vres.error) {
        return Promise.reject(vres.error);
    }
    const sql = 'UPDATE Zawodnik set Imie=?, Nazwisko=?, Pozycja=? Where ID_zawodnik = ?';
    return db.promise().execute(sql, [data.Imie, data.Nazwisko, data.Pozycja, numer]);
};

exports.deleteZawodnik = (zawodnikID) => {
    const sql1 = 'DELETE from Klub_zawodnik WHERE ID_zawodnik=?';
    const sql2 = 'DELETE from Zawodnik Where ID_zawodnik = ?';
    return db.promise().execute(sql1, [zawodnikID])
        .then(() => {
                return db.promise().execute(sql2, [zawodnikID])
            }
        );
};

exports.findZawodnik = (Nazwisko) => {
    const sql = 'SELECT ID_zawodnik, Imie, Pozycja, Password, Rola, Kapitan FROM Zawodnik where Nazwisko = ?';
    return db.promise().execute(sql, [Nazwisko])
        .then((results, fields) => {
            const row = results[0][0];
            if (!row) {
                return '';
            } else {
                return {
                    ID_zawodnik: row.ID_zawodnik,
                    Imie: row.Imie,
                    Nazwisko: Nazwisko,
                    Pozycja: row.Pozycja,
                    Password: row.Password,
                    Rola: row.Rola,
                    Kapitan: row.Kapitan
                };
            }
        }).catch(err => {
            console.log(err);
            throw err;
        });
};