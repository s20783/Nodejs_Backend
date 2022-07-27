const Joi = require('joi');

const errMessage = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole musi zawierać minimum ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole musi zawierać maksymalnie ${err.local.limit} znaków`;
                break;
            case "number.min":
                err.message = `Pole musi zawierać liczbę od 1 do 99`;
                break;
            case "number.max":
                err.message = `Pole musi zawierać liczbę od 1 do 99`;
                break;
            case "number.base":
                err.message = `Pole jest wymagane`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const meczSchema = Joi.object({
    ID_mecz: Joi.number().optional().allow(""),
    Gospodarz: Joi.number().required().error(errMessage),
    Gosc: Joi.number().required().error(errMessage),
    //Wynik_Gospodarz: Joi.number().error(errMessage),
    //Wynik_Gosc: Joi.number().error(errMessage),
    Data_meczu: Joi.date().allow("").error(errMessage),
    Sezon: Joi.number().required().error(errMessage)
});

module.exports = meczSchema;