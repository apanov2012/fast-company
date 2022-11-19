import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";
import SelectField from "../../common/form/selectField";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    const [users, setUsers] = useState();
    const [comments, setComments] = useState();
    const [preparedUsers, setPreparedUsers] = useState();
    const [error, setError] = useState({
        user: "",
        commentText: ""
    });
    useEffect(() => {
        if (users) {
            const preparedUsers = [];
            users.forEach((user) => {
                const preparedUser = {};
                preparedUser.value = user._id;
                preparedUser.label = user.name;
                preparedUsers.push(preparedUser);
            });
            setPreparedUsers(preparedUsers);
        }
    }, [users]);
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    useEffect(() => {
        api.users.fetchAll().then((users) => setUsers(users));
    }, []);
    const refreshComments = () => {
        api.comments.fetchCommentsForUser(userId).then((commentsForUser) =>
            setComments(
                commentsForUser
                    .filter((comment) => comment.pageId === userId)
                    .sort(function (a, b) {
                        if (+a.created_at < +b.created_at) {
                            return -1;
                        }
                        return 0;
                    })
            )
        );
    };
    useEffect(() => {
        refreshComments();
    }, []);

    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };
    const deleteComment = (id) => {
        api.comments.remove(id);
        refreshComments();
    };
    const prepareDate = (ms) => {
        const timeDiff = new Date().getTime() - ms;
        switch (true) {
            case timeDiff < 60000:
                return "1 минуту назад";
            case timeDiff < 300000:
                return "5 минут назад";
            case timeDiff < 600000:
                return "10 минут назад";
            case timeDiff < 1800000:
                return "30 минут назад";
            case timeDiff < 86400000:
                return `${
                    new Date(ms).getHours() < 10
                        ? "0" + new Date(ms).getDate()
                        : new Date(ms).getDate()
                }:${
                    new Date(ms).getMinutes() < 10
                        ? "0" + new Date(ms).getMonth()
                        : new Date(ms).getMonth()
                }`;
            case timeDiff < 31557600000:
                return `${
                    new Date(ms).getDate() < 10
                        ? "0" + new Date(ms).getDate()
                        : new Date(ms).getDate()
                }.${
                    new Date(ms).getMonth() < 10
                        ? "0" + new Date(ms).getMonth()
                        : new Date(ms).getMonth()
                }`;
            case timeDiff > 31557600000:
                return `${
                    new Date(ms).getDate() < 10
                        ? "0" + new Date(ms).getDate()
                        : new Date(ms).getDate()
                }.${
                    new Date(ms).getMonth() < 10
                        ? "0" + new Date(ms).getMonth()
                        : new Date(ms).getMonth()
                }.${new Date(ms).getFullYear()}`;
        }
    };
    const toogleDisable = () => {
        if (error.user && error.commentText) {
            return false;
        }
        return true;
    };
    const handleSubmit = ({ target }) => {
        event.preventDefault();
        api.comments.add({
            userId: target[0].value,
            pageId: userId,
            content: target[1].value
        });
        refreshComments();
        target[1].value = "";
        target[0].value = "";
        setError({
            user: "",
            commentText: ""
        });
    };
    const handleChange = () => {
        // console.log("target", value);
    };
    const handleForm = ({ target }) => {
        setError((prev) => ({ ...prev, [target.name]: target.value }));
    };
    if (user) {
        return (
            <>
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                                        <i
                                            className="bi bi-gear"
                                            onClick={handleClick}
                                        ></i>
                                    </button>
                                    <div className="d-flex flex-column align-items-center text-center position-relative">
                                        <img
                                            src={`https://avatars.dicebear.com/api/avataaars/${(
                                                Math.random() + 1
                                            )
                                                .toString(36)
                                                .substring(7)}.svg`}
                                            className="rounded-circle shadow-1-strong me-3"
                                            alt="avatar"
                                            width="165"
                                            height="165"
                                        />
                                        <div className="mt-3">
                                            <h4>{user.name}</h4>
                                            <p className="text-secondary mb-1">
                                                {user.profession.name}
                                            </p>
                                            <div className="text-muted">
                                                <i
                                                    className="bi bi-caret-down-fill text-primary"
                                                    role="button"
                                                ></i>
                                                <i
                                                    className="bi bi-caret-up text-secondary"
                                                    role="button"
                                                ></i>
                                                <span className="ms-2">
                                                    {user.rate}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-body d-flex flex-column justify-content-center text-center">
                                    <h5 className="card-title">
                                        <span>Qualities</span>
                                    </h5>
                                    <p className="card-text">
                                        <Qualities qualities={user.qualities} />
                                    </p>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card-body d-flex flex-column justify-content-center text-center">
                                    <h5 className="card-title">
                                        <span>Completed meetings</span>
                                    </h5>

                                    <h1 className="display-5">
                                        {user.completedMeetings}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        {/* comments area */}
                        <div className="col-md-8">
                            <form
                                className="card mb-2 p-2"
                                onSubmit={handleSubmit}
                                onChange={handleForm}
                            >
                                {preparedUsers && (
                                    <SelectField
                                        label="Выберите автора комментария "
                                        defaultOption=""
                                        options={preparedUsers}
                                        onChange={handleChange}
                                        name="user"
                                    />
                                )}
                                <textarea
                                    className="card-body mb-2"
                                    type="textarea"
                                    rows="4"
                                    name="commentText"
                                ></textarea>
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                    disabled={toogleDisable()}
                                >
                                    Отправить
                                </button>
                            </form>
                            {/* created comments */}
                            {comments.length ? (
                                <div className="card mb-3">
                                    <div className="card-body ">
                                        <h2>Comments</h2>
                                        <hr />
                                        {users &&
                                            comments.map((comment) => (
                                                <div
                                                    className="bg-light card-body  mb-3"
                                                    key={comment._id}
                                                >
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="d-flex flex-start ">
                                                                <img
                                                                    src={`https://avatars.dicebear.com/api/avataaars/${(
                                                                        Math.random() +
                                                                        1
                                                                    )
                                                                        .toString(
                                                                            36
                                                                        )
                                                                        .substring(
                                                                            7
                                                                        )}.svg`}
                                                                    className="rounded-circle shadow-1-strong me-3"
                                                                    alt="avatar"
                                                                    width="65"
                                                                    height="65"
                                                                />
                                                                <div className="flex-grow-1 flex-shrink-1">
                                                                    <div className="mb-4">
                                                                        <div className="d-flex justify-content-between align-items-center">
                                                                            <p className="mb-1 ">
                                                                                {
                                                                                    users
                                                                                        .filter(
                                                                                            (
                                                                                                user
                                                                                            ) =>
                                                                                                user._id ===
                                                                                                comment.userId
                                                                                        )
                                                                                        .map(
                                                                                            (
                                                                                                user
                                                                                            ) =>
                                                                                                user.name
                                                                                        )[0]
                                                                                }
                                                                                <span className="small mx-1">
                                                                                    {prepareDate(
                                                                                        +comment.created_at
                                                                                    )}
                                                                                </span>
                                                                            </p>
                                                                            <button className="btn btn-sm text-primary d-flex align-items-center">
                                                                                <i
                                                                                    className="bi bi-x-lg"
                                                                                    onClick={() =>
                                                                                        deleteComment(
                                                                                            comment._id
                                                                                        )
                                                                                    }
                                                                                ></i>
                                                                            </button>
                                                                        </div>
                                                                        <p className="small mb-0">
                                                                            {
                                                                                comment.content
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
                {/* <div>
                    <h1> {user.name}</h1>
                    <h2>Профессия: {user.profession.name}</h2>
                    <Qualities qualities={user.qualities} />
                    <p>completedMeetings: {user.completedMeetings}</p>
                    <h2>Rate: {user.rate}</h2>
                    <button onClick={handleClick}>Изменить</button>
                </div> */}
            </>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
