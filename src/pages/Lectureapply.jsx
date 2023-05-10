import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Lectureapply.css"

const Lectureapply = () => {

  return(
    <div className="lap">
      <div className="b1"></div>

      <div className="b2">
        <h1>세종 로고</h1>
      </div>
      
      <div className="left">
        <div className="semester">
          <button>1학년 1학기</button>
          <button>1학년 2학기</button>
          <button>2학년 1학기</button>
          <button>2학년 2학기</button>
          <button>3학년 1학기</button>
          <button>3학년 2학기</button>
          <button>4학년 1학기</button>
          <button>4학년 2학기</button>

        </div>
       
      </div>

      <div className="right">
        <div className="dept">
          <span className="small_rect"> </span>
          <span>학과 검색</span>
          <input 
              maxLength='20'
              className="dept_input"
              type="text"
              placeholder="학과 검색"/>
        </div>

        <div className="obj">
          <span>학과 과목 목록</span>
        </div>

        <div className="apply">
          <button>등록</button>
        </div>

        <div className="grade">
          <span className="small_rect"> </span>
          <span>수강 학점: </span>
          <span className="rect"> </span>
        </div>

        <div className="grade">
          <span className="small_rect"> </span>
          <span>남은 학점: </span>
          <span className="rect"> </span>
        </div>

        <div className="grade">
          <span className="small_rect"> </span>
          <span>학점 평균: </span>
          <span className="rect"> </span>
        </div>


      </div>

     


    </div>
  )
} 
export default Lectureapply;
    