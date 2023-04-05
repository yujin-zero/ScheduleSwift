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
                    <span class="font-large">세종대학교 수강신청 도우미</span>
                    <span class="font-medium">Sejong University Application for classes</span>
                    <span id="login-button" >로그인 / Login</span>
                    <span id="login-button" >회원가입 / Sign up</span>

                    </div>
                </div>
            </div>
            <div className="footer_start">
                <div className="footer_container">
                    <span>세종대학교 서울특별시 광진구 능동로 209 (05006)</span>
                    <span>Sejong University 209, Neungdong-ro, Gwangjin-gu, Seoul, Republic of Korea (05006)</span>
                </div>
                <div className="footer_container" id="footer_container_right">
                    <span>수강신청 운영진 (SERVICE DESK)</span>
                    <span>전화(TEL) : 010-3510-7029</span>
                    <span>이메일(EMAIL) : poly30@naver.com</span>
                    <span>© 유진과 하연이 오리하마</span>
                </div>
            </div>

        </div>
    );
}

export default Start;
