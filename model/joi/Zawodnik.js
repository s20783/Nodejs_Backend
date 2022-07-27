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
            default:
                break;
        }
    });
    return errors;
}

const zawodnikSchema = Joi.object({
    id: Joi.number().optional().allow(""),
    Imie: Joi.string().min(2).max(40).required().error(errMessage),
    Nazwisko: Joi.string().min(2).max(40).required().error(errMessage),
    Pozycja: Joi.string().min(2).max(20).required().error(errMessage)
});

module.exports = zawodnikSchema;