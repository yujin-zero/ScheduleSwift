import React from "react";
import { useNavigate } from "react-router-dom";
import "./Start.css"

const Start = () => {
    let navigate = useNavigate();

    return (
        <div className="root">
            <img src="https://blackboard.sejong.ac.kr/bbcswebdav/institution/login/images/sejong-horizontal.png" 
            className='logo_start'
            alt="sejong-univ-logo horizontal version" id="logo-top" ></img>
            <div className="content_start">
                
                <div className="left_start">
                    <img src="https://blackboard.sejong.ac.kr/bbcswebdav/institution/login/images/sejong.png" 
                    className='logo2_start'></img>
                </div>
                <div className="right_start">
                    <div className="action-container">
                    <span class="font-large">세종대학교 수강신청</span>
                    <span class="font-medium">Sejong University Application for classes</span>
                    <span id="login-button" >로그인 / Login</span>
                    <span id="login-button" >회원가입 / Sign up</span>

                    </div>
                </div>
            </div>
            <div className="footer_start">
                
            </div>

        </div>
    );
}

export default Start;
