import React from "react";
import "./RequestSeat.css"
import { useState, useEffect } from "react";
import axios from 'axios';

const RequestSeat = () => {

    const id = localStorage.getItem('user_id');
    const [addsubject, setAddsubject] = useState([]);

    // 로그인한 학생의 관심과목 가져오기
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.post('/user/addSubject',{id});
                const data = response.data;
                setAddsubject(data);
            }catch(error) {
                console.error('Error fetching courses:',error);
            }
        };
        fetchData();
    },[]);

    return(
      <div className="requestSeat_root">
        <div className="requestSeat_header">
        <img src="../dowadream.png"></img>
            
        </div>

        <div className="requestSeat_left">
            <div className="myob">
            <span className="small_rect1"></span>
            <span className="myobj">내 관심 과목</span>
            
            </div>
          
            <div className="listObj">
                <table>
                    <thead>
                        <tr>
                            <th>이수구분</th>
                            <th>과목명</th>
                            <th>학과</th>
                            <th>강의시간</th>
                            <th>학점</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addsubject.length > 0 ? (
                            addsubject.map((addsubject,index) => (
                                <tr>
                                    <td>{addsubject.class1}</td>
                                    <td>{addsubject.subject}</td>
                                    <td>{addsubject.department}</td>
                                    <td>{addsubject.t_lecture}</td>
                                    <td>{addsubject.credit}</td>
                                </tr>
                            ))
                        ):(
                            <tr>
                                <td colSpan="5">No courses available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="rebtn">
                <button>증원 요청</button>
            </div>

            <div className="request">
                <span className="small_rect1"></span>
                <span className="myobj">증원 요청 현황</span>
            </div>

            <div className="couseTaken">
                <table className="listObj">
                    <tr>
                        <th>분반</th>
                        <th>교과목명</th>
                        <th>요청횟수</th>
                    </tr>
                    <tr>
                        <td>001</td>
                        <td>데이터베이스</td>
                        <td>43</td>
                    </tr>
                    <tr>
                        <td>001</td>
                        <td>자료구조</td>
                        <td>124</td>
                    </tr>
                    <tr>
                        <td>001</td>
                        <td>운영체제</td>
                        <td>33</td>
                    </tr>
                    <tr>
                        <td>002</td>
                        <td>문제해결 및 글쓰기</td>
                        <td>133</td>
                    </tr>
                    <tr>
                        <td>003</td>
                        <td>English Writing 1</td>
                        <td>115</td>
                    </tr>
                    <tr>
                        <td>/</td>
                        <td>세종사회봉사</td>
                        <td>115</td>
                    </tr>
                  
                   
                   
                  
                </table>
            </div>

        </div>

        <div className="requestSeat_right">
            <div className="noti">
                <span className="noti_label">* NOTI *</span>
                <span className="notipart"></span>

            </div>
        </div>

        
      
  
      </div>
    )
  } 
  export default RequestSeat;
