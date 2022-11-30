import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import qualityService from "../../../services/qualityService";

const QualitiesList = ({ qualities }) => {
    const [qualitiesData, setQualitiesData] = useState();
    useEffect(() => {
        qualityService
            .getAllQualities()
            .then((data) => setQualitiesData(data.content));
    }, []);
    if (qualitiesData && qualities) {
        const userQualities = qualities.map((qualId) =>
            qualitiesData.find((qual) => qual._id === qualId)
        );
        return (
            <>
                {userQualities.map((qual) => (
                    <Qualitie key={qual._id} {...qual} />
                ))}
            </>
        );
    } else {
        return "Loading...";
    }
};
QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
