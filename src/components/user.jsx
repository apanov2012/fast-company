import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = (user,handleDelete, handleToggleBookmark) => {
    return (
        <tr key={user._id}>
            <td>{user.name}</td>
            <td>
                {Qualitie(user)}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate} /5</td>
            <td>{BookMark(user.bookmark, user._id, handleToggleBookmark)}</td>
            <td>
                <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            </td>

        </tr>
    );
    
}

export default User;