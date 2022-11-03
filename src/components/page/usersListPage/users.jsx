import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import paginate from "../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import api from "../../../api/index";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "./usersTable";
import _ from "lodash";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchInput, setSearchInput] = useState("");
    const pageSize = 6;

    const [users, setUsers] = useState();
    const [originalUsers, setOriginalUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((users) => setUsers(users));
        api.users.fetchAll().then((users) => setOriginalUsers(users));
    }, []);
    useEffect(() => {
        setSelectedProf();
        setUsers(originalUsers);
        if (originalUsers) {
            setUsers(
                originalUsers.filter((user) =>
                    user.name.toLowerCase().match(searchInput)
                )
            );
        }
    }, [searchInput]);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    if (users) {
        const handlerPageChange = (pageIndex) => {
            setCurrentPage(pageIndex);
        };
        const handleProfessionSelect = (item) => {
            document.querySelector("#searchInput").value = "";
            setUsers(originalUsers);
            setSelectedProf(item);
        };
        const handleSort = (item) => {
            setSortBy(item);
        };
        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        const handleSearchInput = ({ target }) => {
            setSearchInput(target.value);
        };
        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            CLEAR
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <input
                        type="text"
                        placeholder="Search..."
                        name="searchInput"
                        onChange={handleSearchInput}
                        id="searchInput"
                    />
                    {count > 0 && (
                        <UsersTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            searchInput={searchInput}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlerPageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading";
};
Users.propTypes = {
    users: PropTypes.array,
    getUserInfo: PropTypes.func
};

export default Users;
