import React from "react";
import PropTypes from "prop-types";
import { useProfessions } from "../../hooks/useProfession";

const Profession = ({ id }) => {
    const { isLoading, getProfessionById } = useProfessions();
    const profession = getProfessionById(id);
    if (!isLoading) {
        return <p>{profession.name}</p>;
    } else {
        return "Loading...";
    }
};

Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
