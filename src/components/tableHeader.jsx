import React from "react";
import PropTypes from "prop-types";
import CaretChange from "./caretChange";

const tableHeader = ({ onSort, selectedSort, columns }) => {
    // console.log("selectedSort", selectedSort);
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc"
                    ? "desc"
                    : "asc",
                status: selectedSort.status === "up"
                    ? "down"
                    : "up"
            });
        } else {
            onSort({
                path: item,
                order: "asc",
                status: "up"
            });
        }
    };

    // const checkCaret = (item) => {
    //     console.log("item", item);
    //     if (item) {
    //         if (selectedSort.path === item && selectedSort.order === "asc") {
    //             console.log("asc");
    //             return (
    //                 <i className="bi bi-caret-up-fill"></i>
    //             );
    //         } else {
    //             console.log("desc");
    //             return (
    //                 <i className="bi bi-caret-up-fill"></i>
    //             );
    //         }
    //     }
    // };

    return <thead>
        <tr>
            {Object.keys(columns).map((column) => (
                <th key={column}
                    onClick={
                        columns[column].path
                            ? () => handleSort(columns[column].path)
                            : undefined
                    }
                    // onClick={
                    //     columns[column].path
                    //     ? () => handleSort(columns[column].path)
                    //     : undefined
                    // }
                    {...{ role: columns[column].path && "button" }}
                    scope="col">{columns[column].name}
                    {(columns[column].path)
                        ? <CaretChange { ...{ selectedSort } }/>
                        : undefined }
                    {/* <CaretChange { ...{ selectedSort } }/> */}
                </th>
            ))}
        </tr>
    </thead>;
};

tableHeader.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object
};

export default tableHeader;
