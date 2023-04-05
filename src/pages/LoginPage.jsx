import React from "react";
import { useNavigate } from "react-router-dom";
import LoginBtn from "../components/LoginBtn";
import "./Login.css"

const LoginPage = () => {
    let navigate = useNavigate();

    return (
        <div className="contents login">
            ::before
            <div className="inner">
                <h1>세종대학교 포탈 로고</h1>
                <div className="login_text">
                    <p>통합 로그인</p>
                    <span>
                        서비스 이용을 끝낸 후에는 개인정보보호를 위하여 꼭 
                        <em> 로그아웃</em>
                        을 해주시기 바랍니다
                    </span>

                    <span>
                        아이디는 학생은  
                        <em> 학번</em>
                        , 교수/직원은 
                        <em> 포털 아이디(이메일아이디) </em>
                         또는 
                        <em> 직번</em>
                        입니다.
                    </span>
                </div>

                <div className="login_wrap">
                    <div className="input_box">
                        <p>학번/아이디</p>
                        <input type='text'></input>
                    </div>
                    <div className="input_box">
                        <p>비밀번호</p>
                        <input type='password'></input>
                    </div>

                    <a className="loginBtn">
                        <span>로그인</span>
                    </a>
                    <div className="noti">
                        <li>
                            <p>초기 비밀번호는 회원 정보 수정에서 반드시 변경 후 사용하여 주시기 바랍니다.</p>
                        </li>
                        <li>
                            <p>[오류문의]</p>
                            <ul>
                                <li>
                                    - 오리하마 : tel)010-3572-1024, 
                                    <a href="mailto:rlagkdus1024@naver.com">
                                        <span> rlagkdus1024@naver.com</span>
                                    </a>
                
                                </li>
                                <li>
                                    - 오리하마 : tel)010-3510-7029,  
                                    <a href="mailto:poly30@naver.com">
                                        <span> poly30@naver.com</span>
                                    </a>
                
                                </li>
                            </ul>
                        </li>

                    </div>
                </div>

                
            </div>
            
    
            
        </div>

    );
}

export default LoginPage;
