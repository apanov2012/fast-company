import React from "react";

const BookMark = (status,id, handleToggleBookmark) => {
    const changeIcon = (status) => {
        if(!status){
            return "bi bi-umbrella";
        }   return "bi bi-umbrella-fill";
    }
       
    return (
            < i className={changeIcon(status)} onClick={() => handleToggleBookmark(id)}></i>
    );
}

export default BookMark;