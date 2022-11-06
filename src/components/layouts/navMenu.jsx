import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import SingleUser from "../page/userPage/singleUser";
import MainMenu from "./main";
import LoginMenu from "./login";
import Users from "../page/usersListPage/usersListPage";
import EditUserForm from "../common/form/editUserForm";

const NavMenu = () => {
    return (
        <>
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link active" to="/">
                        Main
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="/login">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="/users">
                        Users
                    </Link>
                </li>
            </ul>
            <Switch>
                <Route exact path="/" component={MainMenu} />
                <Route exact path="/login/:type?" component={LoginMenu} />
                <Route exact path="/users" render={() => <Users />} />
                <Route exact path="/users/:userId" component={SingleUser} />
                <Route
                    exact
                    path="/users/:userId/edit"
                    component={EditUserForm}
                />
            </Switch>
        </>
    );
};

export default NavMenu;
