import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Potal.css"
import Moment from 'react-moment';
import {useInterval} from "use-interval";

const Potal = () => {
    let navigate = useNavigate();

    const [nowTime,setNowTime]=useState(Date.now())
    const [id, setId] = useState('');

    useInterval(()=>{
        setNowTime(Date.now())
    },1000)

    return(
        <div className="Potal_root">
            <div className="potal_header">
                <img src="../dowadream.png"></img>
                <span id="potal_logout"onClick={() => navigate('/')}>로그아웃</span>
            </div>
            <div className="potal_name">
                <div className="potal_name_left">
                    <h2>소유진</h2>
                    <p>20003324 소프트웨어학과</p>
                </div>
                <div className="potal_name_right">
                    <Moment format={"HH:mm:ss"} className={'moment-box'}>{nowTime}</Moment>
                    <span id="potal_Application"onClick={() => navigate('/apply')}>수강신청 하기</span>
                </div>
                    
            </div>
            <div className="potal_body">
                <div className="potal_left">
                    <div className="potal_timetable">
                        <div className="potal_timetable_header">
                            <h3>시간표</h3>
                            <span id="potal_interested"onClick={() => navigate('/subjectInterest')}>관심과목 수정</span>
                        </div>
                        <div className="potal_timetable_content">
                            <div className="tablehead">
                                <table> 
                                    <tr>
                                        <td className="non"></td>
                                        <th className="mon">월</th>
                                        <th className="thu">화</th>
                                        <th className="wed">수</th>
                                        <th className="thr">목</th>
                                        <th className="fri">금</th>
                                    </tr>
                                </table>
                            </div>

                            <div className="tablebody">
                                <table>
                                        <tr>
                                            <th>
                                                <div className="hours">
                                                    <div className="hour9">9</div>
                                                    <div className="hour10">10</div>
                                                    <div className="hour11">11</div>
                                                    <div className="hour12">12</div>
                                                    <div className="hour1">1</div>
                                                    <div className="hour2">2</div>
                                                    <div className="hour3">3</div>
                                                    <div className="hour4">4</div>
                                                    <div className="hour5">5</div>
                                                    <div className="hour6">6</div>
                                                    <div className="hour7">7</div>
                                                    <div className="hour8">8</div>
                                                </div>
                                            </th>
                                            <th>
                                                <div className="grids_mon">
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>

                                                </div>
                                            </th>
                                            <th>
                                                <div className="grids_thu">
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>

                                                </div>
                                            </th>
                                            <th>
                                                <div className="grids_wed">
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>

                                                </div>
                                            </th>
                                            <th>
                                                <div className="grids_thr">
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>

                                                </div>
                                            </th>
                                            <th>
                                                <div className="grids_fri">
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>
                                                    <div className="grid"></div>

                                                </div>
                                            </th>
                                        </tr>
                              
                                </table>

                            </div>
                            
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
}
export default Potal;