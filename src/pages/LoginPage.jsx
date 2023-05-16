import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"
import axios from 'axios';

const LoginPage = () => {
    //let navigate = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            // 로그인 요청 보내기
            const response = await axios.post('/user/login', {id, password});

            // 응답에서 토큰 추출
            const {token} = response.data;
            // 토큰을 로컬 스토리나 쿠키에 저장

            localStorage.setItem('user_id',id);
            // 로그인에 성공하면 '/potal' 로 리다이렉트
            alert('로그인성공');
            navigate('/potal');
        }catch (error) {
            alert('로그인실패');
            console.error('Login error: ',error);
        }
    };

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
                    <form onSubmit={handleLogin}>
                    <div className="input_box">
                        <p>학번/아이디</p>
                        <input 
                            type='text'
                            value={id}
                            onChange={e=>setId(e.target.value)}
                            placeholder="학번을 입력해주세요"
                        />
                    </div>
                    <div className="input_box">
                        <p>비밀번호</p>
                        <input 
                            type='password'
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            placeholder="비밀번호를 입력해주세요"
                        />
                    </div>
                        <button type="submit" className="loginBtn">
                            로그인
                        </button> 
                    </form>
                   
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
