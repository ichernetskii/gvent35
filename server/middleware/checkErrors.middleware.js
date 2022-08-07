const {body} = require("express-validator");

module.exports = allowNullabe => [
    body("name")
        .custom((value) => {
            if (!value) return false;
            return value.search(/^[a-zа-я\s.]{2,30}$/i) !== -1;
        })
        .withMessage("Ошибка в имени"),
    body("email")
        .optional({nullable: allowNullabe})
        .isEmail()
        .withMessage("Ошибка в email"),
    body("phone")
        .custom((value) => {
            if (!value) return false;
            // +7 (921) 123-45-67
            return value.search(/^(\+?7|8)?\s?\(?9\d{2}\)?\s?\d{3}-?\d{2}-?\d{2}$/) !== -1;
        })
        .withMessage("Ошибка в номере")
]
