import React from "react";
import { useState } from "react";
import "./Lectureapply.css"

const Lectureapply = () => {

  const [buttonText, setButtonText] = useState('1학년 1학기');
  const [subList, setList] = useState('1-1과목목록');

  const btn1_1 = () => {
    setButtonText('1학년 1학기');
    setList('1-1과목목록');
  };
  const btn1_2 = () => {
    setButtonText('1학년 2학기');
    setList('1-2과목목록');
  };
  const btn2_1 = () => {
    setButtonText('2학년 1학기');
    setList('2-1과목목록');
  };
  const btn2_2 = () => {
    setButtonText('2학년 2학기');
    setList('2-2과목목록');
  };
  const btn3_1 = () => {
    setButtonText('3학년 1학기');
    setList('3-1과목목록');
  };
  const btn3_2 = () => {
    setButtonText('3학년 2학기');
    setList('3-2과목목록');
  };
  const btn4_1 = () => {
    setButtonText('4학년 1학기');
    setList('4-1과목목록');
  };
  const btn4_2 = () => {
    setButtonText('4학년 2학기');
    setList('4-2과목목록');
  };

  return(
    <div className="lectureapply_root">

      <div className="lectureapply_header">
        <img src="../dowadream.png"></img>
      </div>
      
      <div className="left">
        <div className="semester">
          <button onClick={btn1_1}>1학년 1학기</button>
          <button onClick={btn1_2}>1학년 2학기</button>
          <button onClick={btn2_1}>2학년 1학기</button>
          <button onClick={btn2_2}>2학년 2학기</button>
          <button onClick={btn3_1}>3학년 1학기</button>
          <button onClick={btn3_2}>3학년 2학기</button>
          <button onClick={btn4_1}>4학년 1학기</button>
          <button onClick={btn4_2}>4학년 2학기</button>
        </div>
       
      </div>

      <div className="right">
        <div className="label">
          <span>{buttonText}</span>
        </div>
        
        <div className="dept">
          <span className="small_rect"> </span>
          <span>학과 검색</span>
          <input 
              maxLength='20'
              className="dept_input"
              type="text"
              placeholder="학과 검색"/>
        </div>

        <div className="objlist">
          <span>{subList}</span>
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
    