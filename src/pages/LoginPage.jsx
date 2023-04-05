import React from "react";
import { useNavigate } from "react-router-dom";
import LoginBtn from "../components/LoginBtn";
import "./Login.css"

const LoginPage = () => {
    let navigate = useNavigate();

    return (
        <div className="main_container">
            <div className="header">

            </div>
            <div className="body">

            <img src={require("../login_bg.png")} className="login_backgroun_top_image"/>
               
                {/* <div className="login_text">
                    <p>통합 로그인</p>
                    <span>서비스 이용을 끝낸 후에는 개인정보보호를 위하여 <em>로그아웃</em>을 해주시기 바랍니다.</span>
                    <LoginBtn 
                        name="btnlogin" 
                        onClick={() => navigate('/')} 
                    />
                    
                </div> */}
                
            </div>

        </div>
    );
}

export default LoginPage;
