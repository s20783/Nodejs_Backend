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
            case "date.base":
                err.message = `Pole musi zawierać poprawną datę`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const sezonSchema = Joi.object({
    id: Joi.number().optional().allow(""),
    Data_rozpoczecia: Joi.date().required().error(errMessage),
    Data_zakonczenia: Joi.date().required().error(errMessage),
    Nazwa_sezonu: Joi.string().min(2).max(20).required().error(errMessage)
});

module.exports = sezonSchema;