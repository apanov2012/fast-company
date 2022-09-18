import React, { useState } from "react";
import User from "./user";


const Users = (users, ...funcs) => {
    return (
        <>
            {users.map(user => User(user, funcs[0],funcs[1])) }
        </>
    );
};

export default Users;
