import React from "react";
import "./RequestSeat.css"

const RequestSeat = () => {

    return(
      <div className="requestSeat">
        <div className="logo">
            <h1>세종 로고</h1>
        </div>

        <div className="left1">
            <div className="myobj">
            <span className="small_rect1"></span>
            <span className="mo">내 관심 과목</span>
            
            </div>

            <div className="list">
                <span className="listObj">선택 | 학수번호 | 과목명 | 분반 | 학점 </span>
            </div>

            <div className="rebtn">
                <button>증원 요청</button>
            </div>

            <div className="request">
                <span className="small_rect1"></span>
                <span className="mo">증원 요청 현황</span>
            </div>

            <div className="list">
                <span className="listObj">과목 명/요청 횟수</span>
            </div>

        </div>

        <div className="right1">
            <div className="noti">
                <span>* noti!!</span>
                <span className="notipart">
                    증원 요청 시 주의사항을 확인해주세요!</span>

            </div>
        </div>

        
      
  
      </div>
    )
  } 
  export default RequestSeat;
