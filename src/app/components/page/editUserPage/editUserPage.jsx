import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    const history = useHistory();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const { professions, isLoading: professionsLoading } = useProfessions();
    const { qualities, isLoading: qualitiesLoading } = useQualities();
    const { currentUser, updateUser } = useAuth();

    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading && currentUser) {
            setData({
                ...currentUser,
                qualities: transformQualities(currentUser.qualities)
            });
            setIsLoading(false);
        }
    }, [professionsLoading, qualitiesLoading, currentUser]);

    const transformData = (data) => {
        return data.map((elem) => ({ label: elem.name, value: elem._id }));
    };

    const prepareQualsForSubmit = (array) => {
        return array.map((qual) => qual.value);
    };

    const transformQualities = (data) => {
        const qArray = [];
        for (const elem of data) {
            for (const q of qualities) {
                if (q._id === elem) {
                    qArray.push({
                        label: q.name,
                        value: q._id
                    });
                }
            }
        }
        return qArray;
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        },
        qualities: {
            isRequired: {
                message: "Выберите хотя бы одно качество"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        updateUser({
            ...data,
            qualities: prepareQualsForSubmit(data.qualities)
        }).then((response) =>
            response === undefined
                ? history.push(`/users/${data._id}`)
                : history.push(`/users/${data._id}/edit`)
        );
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={transformData(professions)}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={transformData(qualities)}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                                error={errors.qualities}
                                isLoading={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
