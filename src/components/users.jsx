import React from "react";
import { useState } from "react";
import API from "../api";

const Users = () => {
    const [users,setUsers] = useState(API.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter(user => user._id !== userId ));

    }

    const renderPhrase = () => {
        if(users.length>1 &&users.length<5){
            return <h1 key="some" className="badge bg-primary">{users.length} человека тусанут с тобой сегодня</h1>;
        } else if(!users.length){
            return <h1 key="oneoremany" className="badge bg-danger">Никто с тобой не тусанет.Смирись</h1>;
        }
        return <h1 key="nobody" className="badge bg-primary">{users.length} человек тусанeт с тобой сегодня</h1>;
    }

    const addQualityClass = (color) => {
        return `badge bg-${color} m-1`;
    }

    const changeTableClass = () => {
        if(!users.length){return "d-none"};
        return "table";
    }

    const createUsersList = () => {
        return (
            users.map(user => (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.qualities.map(quality => (
                        <span key={quality._id} className={addQualityClass(quality.color)}>{quality.name}</span>
                    ))}</td>
                    <td key={user.profession._id}>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}</td>
                    <td className="badge bg-danger m-2" onClick={() => handleDelete(user._id)}> DELETE</td>
                </tr>
        )));
    }

    const renderTable = () => {
        return (
            <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился,раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col"></th>
                </tr>
            </thead>
        )
    }
    
    return (
        <>
        {renderPhrase()}
        
        <table className={changeTableClass()}>
            {renderTable()}
            <tbody>
                {createUsersList()}
            </tbody>
            
        </table>
        </>
    )
}

export default Users;
