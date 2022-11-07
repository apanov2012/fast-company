import { isArray } from "lodash";

export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        let statusValidate;
        switch (validateMethod) {
            case "isRequired":
                if (typeof data === "boolean") {
                    statusValidate = !data;
                } else if (isArray(data)) {
                    statusValidate = !data.length;
                } else {
                    statusValidate = data.trim() === "";
                }
                break;
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValidate = !emailRegExp.test(data);
                break;
            }
            case "isCapitalSymbol": {
                const capitalRegExp = /[A-Z]+/;
                statusValidate = !capitalRegExp.test(data);
                break;
            }
            case "isContainDigit": {
                const containDigitRegExp = /\d+/;
                statusValidate = !containDigitRegExp.test(data);
                break;
            }
            case "minPassLength": {
                statusValidate = data.length < config.value;
                break;
            }
        }
        if (statusValidate) return config.message;
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
