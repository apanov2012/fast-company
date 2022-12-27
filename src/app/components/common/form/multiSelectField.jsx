import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({
    options,
    onChange,
    name,
    label,
    defaultValue,
    error,
    isLoading
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;
    const getInputClasses = () => {
        return " basic-multi-select" + (error ? " is-invalid" : "");
    };
    const handleChange = (value) => {
        onChange({
            name: name,
            value
        });
    };
    return (
        <div className="mb-4">
            {!isLoading && (
                <>
                    <label className="form-label">{label}</label>
                    <Select
                        isMulti
                        closeMenuOnSelect={false}
                        defaultValue={defaultValue}
                        options={optionsArray}
                        className={getInputClasses()}
                        classNamePrefix="select"
                        onChange={handleChange}
                        name={name}
                    />
                </>
            )}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array,
    error: PropTypes.string,
    isLoading: PropTypes.bool
};

export default MultiSelectField;
