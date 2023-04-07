import React from "react";
import "./BackImg.css"

function BackImg(props){
    return (
        <div className="backImg" onClick={props.onClick}>
            <div>{props.name}</div>
        </div>
    );
    
    }


export default BackImg;