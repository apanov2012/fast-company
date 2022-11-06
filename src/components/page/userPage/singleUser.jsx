import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";
import QualitiesList from "../../ui/qualities/qualitiesList";

const SingleUser = () => {
    const [userParams, setUserParams] = useState();
    const changeUserParams = (data) => {
        setUserParams(data);
    };
    const idForSearch = useParams();
    useEffect(() => {
        api.users
            .getUserById(idForSearch.userId)
            .then((data) => changeUserParams(data));
    }, []);
    const buttonStyle = {
        textDecoration: "none",
        color: "black"
    };
    if (userParams) {
        return (
            <>
                <table>
                    <tbody>
                        <tr>
                            <td>Имя :</td>
                            <td>{userParams.name}</td>
                        </tr>
                        <tr>
                            <td>Профессия :</td>
                            <td>{userParams.profession.name}</td>
                        </tr>
                        <tr>
                            <td>Качества :</td>
                            <td>
                                {
                                    <QualitiesList
                                        qualities={userParams.qualities}
                                    />
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Количество встреч :</td>
                            <td>{userParams.completedMeetings}</td>
                        </tr>
                        <tr>
                            <td>Рейтинг :</td>
                            <td>{userParams.rate}</td>
                        </tr>
                    </tbody>
                </table>
                <button>
                    <a href={`/users/${userParams._id}/edit`} style={buttonStyle}>
                        Изменить
                    </a>
                </button>
            </>
        );
    } else {
        return <h1>LOADING...</h1>;
    }
};
SingleUser.propTypes = {
    location: PropTypes.object
};

export default SingleUser;
