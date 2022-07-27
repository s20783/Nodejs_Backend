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
            case "number.base":
                err.message = `Pole jest wymagane`;
                break;
            case "number.max":
                err.message = `Pole musi zawierać liczbę od 1 do 99`;
                break;
            case "number.min":
                err.message = `Pole musi zawierać liczbę od 1 do 99`;
                break;
            case "date.base":
                err.message = `Pole musi zawierać poprawną datę`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const klubZawodnikSchema = Joi.object({
    id: Joi.number().optional().allow(""),
    ID_klub: Joi.number().required().error(errMessage),
    ID_zawodnik: Joi.number().required().error(errMessage),
    Numer: Joi.number().min(1).max(99).required().error(errMessage),
    Od_kiedy: Joi.date().required().error(errMessage),
    Do_kiedy: Joi.date().allow("").allow(null)
});

module.exports = klubZawodnikSchema;