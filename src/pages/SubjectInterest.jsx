import React from "react";
import { useNavigate } from "react-router-dom";
import "./SubjectInterest.css"

const SubjectInterest = () => {
    let navigate = useNavigate();

    return(
      <div className="subjectInterest_root">
        <div className="subjectInterest_header">
        <img src="../dowadream.png"></img>
        </div>

        <div className="subjectInterest_left">
            <div className="subjectInterest_dept">
                <span className="si_rect"> </span>
                <span>학과 검색</span>
                <input 
                    maxLength='20'
                    className="dept_input"
                    type="text"
                    placeholder="학과 검색"/>
            </div>

            <div className="si_subjectlist">
                <span></span>
            </div>

            <div className="includebtn">
                <button>담기</button>
            </div>

            <div className="mysubject">
                <span className="si_rect"></span>
                <span className="mysb">담은 과목</span>
            </div>

            <div className="si_subjectlist">
                <span></span>
            </div>
           

        </div>

        <div className="subjectInterest_right">
            <div className="gorequestSeat">
                <button id="potal_requestSeat"onClick={() => navigate('/requestSeat')}>증원요청 하러가기</button>
            </div>

            <div className="time">
                <span className="right_si_rect"></span>
                <span className="mytime">시간표</span>
                <span className="timepart"></span>
            </div>
        </div>
      </div>
    )
  } 
  export default SubjectInterest;
