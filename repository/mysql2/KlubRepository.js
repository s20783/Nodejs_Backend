const db = require('../../config/mysql2/db');
const klubSchema = require('../../model/joi/Klub');

checkNazwaUnique = (Nazwa, ID_klub) => {
    let promise;
    if (ID_klub) {
        const sql = `SELECT COUNT(1) AS c FROM Klub Where Nazwa = ? AND ID_klub != ?`;
        promise = db.promise().query(sql, [Nazwa, ID_klub]);
    } else {
        const sql = `SELECT COUNT(1) AS c FROM Klub Where Nazwa = ?`;
        promise = db.promise().query(sql, [Nazwa]);
    }
    return promise.then((results, fields) => {
        const count = results[0][0].c;
        let err = null;
        if (count > 0) {
            err = {
                details: [{
                    path: ['Nazwa'],
                    message: 'Podana nazwa jest już używana'
                }]
            };
        }
        return err;
    });
}

exports.getKluby = () => {
    return db.promise().query('SELECT ID_klub, Nazwa, Skrot, Kolor_stroju FROM Klub')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getKlubById = (klubID) => {
    const sql = 'SELECT ID_klub, Nazwa, Skrot, Kolor_stroju FROM Klub Where ID_klub = ?';
    return db.promise().execute(sql, [klubID])
        .then((results, fields) => {
            const row = results[0][0];
            if (!row) {
                return '';
            } else {
                return {
                    ID_klub: klubID,
                    Nazwa: row.Nazwa,
                    Skrot: row.Skrot,
                    Kolor_stroju: row.Kolor_stroju
                };
            }
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getKlubDetails = (ID_klub) => {
    const sql = 'SELECT k.ID_klub, k.Nazwa, k.Skrot, k.Kolor_stroju, z.Imie, z.Nazwisko, z.Pozycja, kz.Numer, kz.Od_kiedy, kz.Do_kiedy FROM Klub k left join Klub_zawodnik kz on kz.ID_klub = k.ID_klub  left join Zawodnik z on z.ID_zawodnik = kz.ID_zawodnik Where k.ID_klub = ?';
    return db.promise().execute(sql, [ID_klub])
        .then((results, fields) => {
            const row = results[0][0];
            if (!row) {
                return '';
            } else {
                const xList = {
                    ID_klub: row.ID_klub,
                    Nazwa: row.Nazwa,
                    Skrot: row.Skrot,
                    Kolor_stroju: row.Kolor_stroju,
                    info: []
                };
                for (let i = 0; i < results[0].length; i++) {
                    const row = results[0][i];
                    const x = {
                        Imie: row.Imie,
                        Nazwisko: row.Nazwisko,
                        Pozycja: row.Pozycja,
                        Numer: row.Numer,
                        Od_kiedy: row.Od_kiedy,
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

exports.addKlub = (data) => {
    const vres = klubSchema.validate(data, {abortEarly: false});
    if (vres.error) {
        return Promise.reject(vres.error);
    }
    return checkNazwaUnique(data.Nazwa).then(
        nazwaErr => {
            if (nazwaErr) {
                return Promise.reject(nazwaErr);
            } else {
                const sql = 'INSERT into Klub (Nazwa, Kolor_stroju, Skrot) VALUES (?, ?, ?)';
                return db.promise().execute(sql, [data.Nazwa, data.Kolor_stroju, data.Skrot]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

exports.editKlub = (data, klubID) => {
    const vres = klubSchema.validate(data, {abortEarly: false});
    if (vres.error) {
        return Promise.reject(vres.error);
    }
    return checkNazwaUnique(data.Nazwa, klubID).then(
        nazwaErr => {
            if (nazwaErr) {
                return Promise.reject(nazwaErr);
            } else {
                const sql = 'UPDATE Klub set Nazwa=?, Kolor_stroju=?, Skrot=? WHERE ID_klub=?';
                return db.promise().execute(sql, [data.Nazwa, data.Kolor_stroju, data.Skrot, klubID]);
            }
        })
        .catch(err => {
            return Promise.reject(err);
        });
};

exports.deleteKlub = (klubID) => {
    const sql1 = 'DELETE from Klub_zawodnik WHERE ID_klub=?';
    const sql2 = 'DELETE from Klub WHERE ID_klub=?';
    return db.promise().execute(sql1, [klubID])
        .then(() => {
                return db.promise().execute(sql2, [klubID])
            }
        );
};


