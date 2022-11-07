import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({
    options,
    onChange,
    name,
    label,
    defaultValue,
    error
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  value: options[optionName]._id,
                  label: optionName
              }))
            : options;
    const handleChange = (value) => {
        onChange({ name: name, value });
    };
    const getInputClasses = () => {
        return "form-label" + (error ? " is-invalid" : "");
    };
    return (
        <>
            <div className="mb-4">
                <label className={getInputClasses()}>{label}</label>
                <Select
                    isMulti
                    closeMenuOnSelect={false}
                    defaultValue={defaultValue}
                    options={optionsArray}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleChange}
                    name={name}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array,
    error: PropTypes.string
};

export default MultiSelectField;
