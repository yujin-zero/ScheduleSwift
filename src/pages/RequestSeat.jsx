import React from "react";
import "./RequestSeat.css"

const RequestSeat = () => {

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
          
            <div className="couseTaken">
                <table className="listObj">
                    <tr>
                        <th>분반</th>
                        <th>교과목명</th>
                        <th>학점</th>
                        <th>이수구분</th>
                    </tr>
                    <tr>
                        <td>001</td>
                        <td>자료구조</td>
                        <td>3</td>
                        <td>전필</td>
                    </tr>
                    <tr>
                        <td>001</td>
                        <td>데이터베이스</td>
                        <td>3</td>
                        <td>전필</td>
                    </tr>
                    <tr>
                        <td>001</td>
                        <td>운영체제</td>
                        <td>3</td>
                        <td>전필</td>
                    </tr>
                    <tr>
                        <td>002</td>
                        <td>문제해결 및 글쓰기</td>
                        <td>3</td>
                        <td>교양</td>
                    </tr>
                  
                    <tr>
                        <td>003</td>
                        <td>English Writing 1</td>
                        <td>2</td>
                        <td>교양</td>
                    </tr>
                    <tr>
                        <td>/</td>
                        <td>세종사회봉사</td>
                        <td>2</td>
                        <td>교양</td>
                    </tr>
                
                     
                  
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
