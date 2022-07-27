// const repository = require('../../repository/mysql2/MeczRepository');
// const con = require('../../controllers/MeczeController');


function golePlus(value, value2) {
    // const db = require('../../config/mysql2/db');
    const repository = require('../../repository/mysql2/MeczRepository');
    alert(value + ' ' + value2);
    const v1 = (parseInt(value));
    const v2 = (parseInt(value2));
    //con.showMeczeList;
    // return repository.golePlus(value, value2)
    //     .then(
    //         obj => {
    //         window.location.reload();
    // });
    // const sql= 'Update Zawodnik_Mecz Set Gole = 2 Where ID_zawodnik = ? AND ID_mecz = ? ';
    // return db.execute(sql, [v1, v2]);
}
function goleMinus(value) {
    alert(value + ' minus');
}
function asystyPlus(value) {
    alert(value);
}
function asystyMinus(value) {
    alert(value + ' minus');
}