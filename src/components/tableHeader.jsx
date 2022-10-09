import React, { useState } from "react";
import PropTypes from "prop-types";
import CaretChange from "./caretChange";

const tableHeader = ({ onSort, selectedSort, columns }) => {
    const [currentPath, setCurrentPath] = useState();
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc"
                    ? "desc"
                    : "asc"
            });
        } else {
            onSort({
                path: item,
                order: "asc"
            });
        }
    };

    const changeCurrentPath = (column) => {
        setCurrentPath(column);
    };
    const complexOfActions = (item) => {
        handleSort(item);
        changeCurrentPath(item);
    };

    return <thead>
        <tr>
            {Object.keys(columns).map((column) => (
                <th key={column}
                    onClick={
                        columns[column].path
                            ? () => complexOfActions(columns[column].path)
                            : undefined
                    }
                    {...{ role: columns[column].path && "button" }}
                    scope="col">{columns[column].name}
                    {(columns[column].path === currentPath)
                        ? <CaretChange { ...{ selectedSort, currentPath } } />
                        : undefined }
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
