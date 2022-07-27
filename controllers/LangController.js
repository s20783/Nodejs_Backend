const i18n = require('i18n');

exports.changeLang = (req, res, next) => {
    const newLang = req.params.lang;

    if(['pl','en'].includes(newLang)) {
        res.cookie('liga-lang', newLang);
    };
    res.redirect('/');
}