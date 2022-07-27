const db = require('../../config/mysql2/db');
const sezonSchema = require('../../model/joi/Sezon');

exports.getSezony = () => {
    return db.promise().query('SELECT ID_sezon, Nazwa_sezonu, Data_rozpoczecia, Data_zakonczenia FROM Sezon')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getSezonById = (id) => {
    const sql = 'SELECT Nazwa_sezonu, Data_rozpoczecia, Data_zakonczenia FROM Sezon Where ID_sezon=?';
    return db.promise().execute(sql, [id])
        .then((results, fields) => {
            const row = results[0][0];
            if (!row) {
                return '';
            } else {
                return {
                    ID_sezon: id,
                    Nazwa_sezonu: row.Nazwa_sezonu,
                    Data_rozpoczecia: new Date(row.Data_rozpoczecia.getTime() + (60 * 60 * 1000)).toISOString().split('T')[0],
                    Data_zakonczenia: new Date(row.Data_zakonczenia.getTime() + (60 * 60 * 1000)).toISOString().split('T')[0]
                };
            }
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getSezonByIdRaw = (id) => {
    const sql = 'SELECT Nazwa_sezonu, Data_rozpoczecia, Data_zakonczenia FROM Sezon Where ID_sezon=?';
    return db.promise().execute(sql, [id])
        .then((results, fields) => {
            const row = results[0][0];
            if (!row) {
                return '';
            } else {
                return {
                    ID_sezon: id,
                    Nazwa_sezonu: row.Nazwa_sezonu,
                    Data_rozpoczecia: new Date(row.Data_rozpoczecia.getTime() + (60 * 60 * 1000)).toISOString().split('T')[0],
                    Data_zakonczenia: new Date(row.Data_zakonczenia.getTime() + (60 * 60 * 1000)).toISOString().split('T')[0]
                };
            }
        }).catch(err => {
            console.log(err);
            throw err;
        });
};

exports.getSezonTable = (id) => {
    const sql = 'select \n' +
        '    (select Nazwa from Klub where ID_klub = Gospodarz) AS Klub_nazwa, \n' +
        '    count(*) played, \n' +
        '    count(case when Wynik_Gospodarz > Wynik_Gosc then 1 end) wins,  \n' +
        '    count(case when Wynik_Gosc = Wynik_Gospodarz then 1 end) draws,\n' +
        '    count(case when Wynik_Gosc > Wynik_Gospodarz then 1 end) lost,\n' +
        '    sum(Wynik_Gospodarz) gole_strzelone, \n' +
        '    sum(Wynik_Gosc) gole_stracone,\n' +
        '    (sum(Wynik_Gospodarz)-sum(Wynik_Gosc)) gole_diff,\n' +
        '    sum(case when Wynik_Gospodarz > Wynik_Gosc then 3 else 0 end \n' +
        '        + case when Wynik_Gospodarz = Wynik_Gosc then 1 else 0 end) score \n' +
        'from (\n' +
        '    select Gospodarz, Wynik_Gospodarz, Wynik_Gosc from Mecz  where ID_sezon= ?' +
        '  union all\n' +
        '    select Gosc, Wynik_Gosc, Wynik_Gospodarz from Mecz where ID_sezon = ?\n' +
        ') a \n' +
        'Group by Gospodarz Order by score DESC, gole_diff DESC, gole_strzelone DESC';

    return db.promise().execute(sql, [id, id])
        .then((results, fields) => {
            const row = results[0][0];
            if (!row) {
                return '';
            } else {
                const xList = {
                    info: []
                };
                for (let i = 0; i < results[0].length; i++) {
                    const row = results[0][i];
                    const x = {
                        Nazwa: row.Klub_nazwa,
                        Played: row.played,
                        Punkty: row.score,
                        Z: row.wins,
                        R: row.draws,
                        P: row.lost,
                        GoleStrzelone: row.gole_strzelone,
                        GoleStracone: row.gole_stracone,
                        GoleRoznica: row.gole_diff
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

exports.getGoleTable = (id) => {
    const sql = 'Select sum(zm.Gole) AS Gole, z.Imie, z.Nazwisko, k.Nazwa from Zawodnik_Mecz zm, Mecz m, Zawodnik z, Klub_zawodnik kz, Klub k Where zm.ID_mecz = m.ID_mecz AND z.ID_zawodnik = zm.ID_zawodnik AND kz.ID_zawodnik = z.ID_zawodnik AND kz.ID_klub = k.ID_klub AND m.ID_sezon=? ' +
        'GROUP BY z.Imie, z.Nazwisko, k.Nazwa HAVING Gole > 0 ORDER BY Gole DESC LIMIT 10;';
    return db.promise().execute(sql, [id])
        .then((results, fields) => {
                const row = results[0][0];
                if (!row) {
                    return '';
                } else {
                    const xList = {
                        info: []
                    };
                    for (let i = 0; i < results[0].length; i++) {
                        const row = results[0][i];
                        const x = {
                            Gole: row.Gole,
                            Value1: row.Gole,
                            Imie: row.Imie,
                            Nazwisko: row.Nazwisko,
                            Klub: row.Nazwa
                        }
                        xList.info.push(x);
                    }
                    console.log(xList);
                    return xList;
                }
            }
        ).catch(err => {
            console.log(err);
            throw err;
        });
}

exports.getAsystyTable = (id) => {
    const sql = 'Select sum(zm.Asysty) AS Asysty, z.Imie, z.Nazwisko, k.Nazwa from Zawodnik_Mecz zm, Mecz m, Zawodnik z, Klub_zawodnik kz, Klub k Where zm.ID_mecz = m.ID_mecz AND z.ID_zawodnik = zm.ID_zawodnik AND kz.ID_zawodnik = z.ID_zawodnik AND kz.ID_klub = k.ID_klub AND m.ID_sezon=? ' +
        'GROUP BY z.Imie, z.Nazwisko, k.Nazwa HAVING Asysty > 0 ORDER BY Asysty DESC LIMIT 10;';
    return db.promise().execute(sql, [id])
        .then((results, fields) => {
                const row = results[0][0];
                if (!row) {
                    return '';
                } else {
                    const xList = {
                        info: []
                    };
                    for (let i = 0; i < results[0].length; i++) {
                        const row = results[0][i];
                        const x = {
                            Asysty: row.Asysty,
                            Value1: row.Asysty,
                            Imie: row.Imie,
                            Nazwisko: row.Nazwisko,
                            Klub: row.Nazwa
                        }
                        xList.info.push(x);
                    }
                    console.log(xList);
                    return xList;
                }
            }
        ).catch(err => {
            console.log(err);
            throw err;
        });
}

exports.addSezon = (data) => {
    const vres = sezonSchema.validate(data, {abortEarly: false});
    if (vres.error) {
        return Promise.reject(vres.error);
    }

    const sql = 'INSERT into Sezon (Nazwa_sezonu, Data_rozpoczecia, Data_zakonczenia) VALUES (?, ?, ?)';
    return db.promise().execute(sql, [data.Nazwa_sezonu, data.Data_rozpoczecia, data.Data_zakonczenia.toLocaleString('en-EU', {timeZone: 'Europe/Amsterdam'})]);
};

exports.editSezon = (data, id) => {
    const vres = sezonSchema.validate(data, {abortEarly: false});
    if (vres.error) {
        return Promise.reject(vres.error);
    }
    const sql = 'Update Sezon set Nazwa_sezonu=?, Data_rozpoczecia=?, Data_zakonczenia=? Where ID_sezon = ?';
    return db.promise().execute(sql, [data.Nazwa_sezonu, data.Data_rozpoczecia, data.Data_zakonczenia, id]);
};

exports.deleteSezon = (sezonID) => {
    const sql1 = 'DELETE from Sezon WHERE ID_sezon = ?';
    // const sql2 = 'DELETE from Klub WHERE ID_klub=?';
    // return db.promise().execute(sql1, [klubID])
    //     .then(() => {
    return db.promise().execute(sql1, [sezonID]);
    //     }
    // );
};