import React from "react";
import PropTypes from "prop-types";

const CaretChange = ({ selectedSort, currentPath }) => {
    if (selectedSort.path === currentPath) {
        if (selectedSort.order === "asc") {
            return <i className="bi bi-caret-down-fill"></i>;
        } else {
            return <i className="bi bi-caret-up-fill"></i>;
        }
    }
    return null;
};
CaretChange.propTypes = {
    selectedSort: PropTypes.object,
    currentPath: PropTypes.string
};

export default CaretChange;
