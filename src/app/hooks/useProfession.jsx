import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import professionService from "../services/profession.service";
import { toast } from "react-toastify";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
    return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [professions, setProfessions] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getProfessions();
    }, []);
    async function getProfessions() {
        try {
            const { content } = await professionService.get();
            setProfessions(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    useEffect(() => {
        if (error) {
            toast(error);
            setError(null);
        }
    }, [error]);
    function errorCatcher(error) {
        console.log("error.response in useUsers", error);
        const { message } = error.response.data;
        setError(message);
    }
    function getProfessionById(id) {
        return professions.find((profession) => profession._id === id);
    }
    return (
        <ProfessionContext.Provider
            value={{ isLoading, professions, getProfessionById }}
        >
            {children}
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
