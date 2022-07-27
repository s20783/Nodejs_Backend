const Joi = require('joi');
const i18n = require('i18n');
const req = require("i18n");

const errMessage = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = req.__('validation.fieldRequired')
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
            default:
                break;
        }
    });
    return errors;
}

const klubSchema = Joi.object({
    id: Joi.number().optional().allow(""),
    Nazwa: Joi.string().min(2).max(40).required().error(errMessage),
    Kolor_stroju: Joi.string().min(2).max(20).required().error(errMessage),
    Skrot: Joi.string().min(2).max(3).required().error(errMessage)
});

module.exports = klubSchema;