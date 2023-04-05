import React from "react";
import "./BtnLogin.css"

function LoginBtn(props){
    return (
        <div className="loginBtn" onClick={props.onClick}>
            <div>{props.name}</div>
        </div>
    );
    }

export default LoginBtn;