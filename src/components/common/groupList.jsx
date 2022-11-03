import React from "react";
import PropTypes from "prop-types";
import { isArray } from "lodash";

const GroupList = ({ items, valueProperty, contentProperty, onItemSelect, selectedItem }) => {
    return (
        <ul className="list-group">
            {isArray(items)
                ? Object.keys(items).map(item =>
                    <li
                        key={items[item][valueProperty]}
                        className={"list-group-item" + (items[item] === selectedItem ? " active" : "")}
                        onClick={() => onItemSelect(items[item])}
                        role= "button"
                    >
                        {items[item][contentProperty]}
                    </li>
                )
                : items.map(item =>
                    <li
                        key={items[item][valueProperty]}
                        className={"list-group-item" + (items[item] === selectedItem ? " active" : "")}
                        onClick={() => onItemSelect(items[item])}
                        role="button"
                    >
                        {items[item][contentProperty]}
                    </li>)
            }
        </ul>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    selectedItem: PropTypes.object
};

export default GroupList;
