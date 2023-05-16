import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Potal.css"
import Moment from 'react-moment';
import {useInterval} from "use-interval";
import axios from 'axios';

const Potal = () => {
    let navigate = useNavigate();

    const [nowTime,setNowTime]=useState(Date.now())
    // 이름, 학번, 학과
    const [userInfo, setUserInfo] = useState('');

    // 시간 설정
    useInterval(()=>{
        setNowTime(Date.now())
    },1000)

    // 포탈 header에 이름 띄우기
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {  
                const userId = localStorage.getItem('user_id');

                // 백엔드 서버로 특정 정보를 요청
                //const userId = '20003319';
                const response = await axios.get('/user/info',{
                    params: {id: userId} // 사용자 ID를 매개변수로 전달
                });

                // 응답에서 특정 정보를 받아옴
                const userInfo = response.data;

                setUserInfo(userInfo);
            }catch(error) {
                console.error('회원x 정보 가져오기 오류: ',error);
            }
        };
        fetchUserInfo();
    },[]);

    return(
        <div className="Potal_root">
            <div className="potal_header">
                <img src="../dowadream.png"></img>
                <span id="potal_logout"onClick={() => navigate('/')}>로그아웃</span>
            </div>
            <div className="potal_name">
                <div className="potal_name_left">
                    {userInfo ? (
                        <div>
                        <h2>{userInfo.name}</h2>
                        <p>{userInfo.id} {userInfo.department}</p>
                        </div>
                    ) : (
                        <h2>회원정보 없음 ...</h2>
                    )}
                </div>
                <div className="potal_name_right">
                    <Moment format={"HH:mm:ss"} className={'moment-box'}>{nowTime}</Moment>
                    <span id="potal_Application"onClick={() => navigate('/apply')}>수강신청 하기</span>
                </div>
                    
            </div>
            <div className="potal_body">
                <div className="potal_timetable">
                    <div className="potal_timetable_header">
                        <h3>예상 시간표</h3>
                        <span id="potal_interested"onClick={() => navigate('/subjectInterest')}>관심과목 수정</span>
                    </div>
                    <div className="potal_timetable_content">
                        
                        <div className="tablebody">
                            <table className="tablebody">
                                <tbody>
                                    <tr>
                                        <th>
                                            <div className="hours">
                                                <div className="hour0">0교시</div>
                                                <div className="hour1">1교시</div>
                                                <div className="hour2">2교시</div>
                                                <div className="hour3">3교시</div>
                                                <div className="hour4">4교시</div>
                                                <div className="hour5">5교시</div>
                                                <div className="hour6">6교시</div>
                                                <div className="hour7">7교시</div>
                                                <div className="hour8">8교시</div>
                                                <div className="hour8">9교시</div>
                                                <div className="hour8">10교시</div>
                                                <div className="hour8">11교시</div>
                                                <div className="hour8">12교시</div>
                                            </div>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        
                    </div>



                </div>
                <div className="potal_right">
                    <div className="potal_information">
                        <div className="potal_info1">
                            <h3>취득 학점</h3>
                            <span id="potal_get"onClick={() => navigate('/lectureapply')}>취득학점 수정</span>
                        </div>
                        <div className="potal_info2">
                            <table>
                                <tr>
                                    <th>전공필수</th>
                                    <th>전공선택</th>
                                    <th>전공기초</th>
                                    <th>전공합계</th>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>20</td>
                                    <td>10</td>
                                    <td>40</td>
                                </tr>
                                <tr>
                                    <th>교양필수</th>
                                    <th>교양선택</th>
                                    <th>교양합계</th>
                                    <th>총합계</th>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>10</td>
                                    <td>15</td>
                                    <td>55</td>
                                </tr>
                            </table>
                        </div>
                        <div className="potal_info3">
                            <h3>졸업학점 / 남은학점</h3>
                            <table>
                                <tr>
                                    <th>전공필수</th>
                                    <th>전공선택</th>
                                    <th>전공기초</th>
                                    <th>전공합계</th>
                                </tr>
                                <tr>
                                    <td>40 / 30</td>
                                    <td>50 / 30</td>
                                    <td>20 / 10</td>
                                    <td>110 / 70</td>
                                </tr>
                                <tr>
                                    <th>교양필수</th>
                                    <th>교양선택</th>
                                    <th>교양합계</th>
                                    <th>총합계</th>
                                </tr>
                                <tr>
                                    <td>10 / 5</td>
                                    <td>20 / 10</td>
                                    <td>30 / 15</td>
                                    <td>140 / 85</td>
                                </tr>
                            </table>
                        </div>
                        <div className="potal_info4">
                            <h3>평점평균</h3>
                            <table>
                                <tr>
                                    <th>교양평균</th>
                                    <th>전공평균</th>
                                    <th>전체평균</th>
                                </tr>
                                <tr>
                                    <td>3.00</td>
                                    <td>4.41</td>
                                    <td>4.10</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className="potal_grade">
                        <h4>취득학점 / 졸업학점 </h4>
                        <h3>75 / 140</h3>
                    </div>
                </div>
                
            </div>

        </div>

    );
};
export default Potal;