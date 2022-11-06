import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    onChange,
    dafaultOption,
    options,
    name,
    error
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  name: optionName,
                  value: options[optionName]._id
              }))
            : options;

    return (
        <>
            <div className="mb-4">
                <label htmlFor={name} className="form-label">
                    {label}
                </label>
                <select
                    className={getInputClasses()}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                >
                    <option disabled={false} value="">
                        {dafaultOption}
                    </option>
                    {optionsArray &&
                        optionsArray.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                </select>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </>
    );
};

SelectField.propTypes = {
    dafaultOption: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.string
};
export default SelectField;
