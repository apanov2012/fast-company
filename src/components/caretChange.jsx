import React from "react";
import PropTypes from "prop-types";

const CaretChange = ({ selectedSort }) => {
    console.log("CaretChangeItem", selectedSort);
    return (
        <i className="bi bi-caret-up-fill"></i>
    );
};
CaretChange.propTypes = {
    selectedSort: PropTypes.object
};

export default CaretChange;

// if (item) {
//     if (selectedSort.path === item && selectedSort.order === "asc") {
//         console.log("asc");
//         return (
//             <i className="bi bi-caret-up-fill"></i>
//         );
//     } else {
//         console.log("desc");
//         return (
//             <i className="bi bi-caret-up-fill"></i>
//         );
//     }
// }
