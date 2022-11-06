import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";
import TextField from "./textField";
import SelectField from "./selectField";
import RadioField from "./radioField";
import MultiSelectField from "./multiSelect";

const EditUserForm = () => {
    const idForSearch = useParams();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        profession: {},
        qualities: [],
        sex: ""
    });
    const [qualities, setQualities] = useState([]);
    const [professions, setProfessions] = useState();
    const changeUserData = (data) => {
        setUserData(data);
    };
    useEffect(() => {
        api.users
            .getUserById(idForSearch.userId)
            .then((userInfo) => changeUserData(userInfo));
    }, []);
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const handleChange = (event) => {
        setUserData((prev) => ({
            ...prev,
            [event.name]: event.value
        }));
    };
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const filterProfession = (profId) => {
        if (professions) {
            return professions.filter(
                (profession) => profession.value !== profId
            );
        }
    };
    const changeQualities = (array) => {
        const updatedQualitiesArray = [];
        for (const element of array) {
            updatedQualitiesArray.push({
                label: element.name,
                value: element._id,
                color: element.color
            });
        }
        return updatedQualitiesArray;
    };
    const prepareQualitiesForSend = (array) => {
        const preparedQualitiesArray = [];
        for (const element of array) {
            preparedQualitiesArray.push({
                _id: element.value,
                name: element.label,
                color: element.color
            });
        }
        return preparedQualitiesArray;
    };
    const handleProfession = (event) => {
        setUserData((prev) => ({
            ...prev,
            [event.name]: getProfessionById(event.value)
        }));
    };
    const handleQualities = (event) => {
        console.log("handleQualities event", event);
        setUserData((prev) => ({
            ...prev,
            qualities: prepareQualitiesForSend(event.value)
        }));
    };
    const handleSubmit = (event) => {
        api.users.update(idForSearch.userId, userData);
        location.href = `/users/${idForSearch.userId}`;
        event.preventDefault();
    };
    return userData.name ? (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={userData.name}
                                onChange={handleChange}
                                // error={errors.email}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={userData.email}
                                onChange={handleChange}
                                // error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                onChange={handleProfession}
                                options={filterProfession(
                                    userData.profession._id
                                )}
                                dafaultOption={userData.profession.name}
                                name="profession"
                                // error={errors.profession}
                                value="Pidor"
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Liberal", value: "liberal" }
                                ]}
                                value={userData.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите Ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleQualities}
                                defaultValue={changeQualities(userData.qualities)}
                                name="qualities"
                                label="выберите Ваши качества"
                            />
                            <button
                                className="btn btn-primary w-100 mx-auto"
                                type="submit"
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <h3>Loading</h3>
    );
};

export default EditUserForm;
