import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Lectureapply.css"

const Lectureapply = () => {

  const menuLst = ["학년/학기"];
  const [hide, setHide] = useState({
    menu1: false
  });

  const mouseEvent = (menuName, bool) => {
    const change = { ...hide };
    change[menuName] = bool;
    setHide(change);
  };
    
  return(
    <div className="lap">
      <div className="b1"></div>

      <div className="b2">
        <h1>세종 로고</h1>

        <nav className="nav">
          <ul className="navContainer">
            {menuLst.map((v, idx) => (
              <li
                className={hide[v] ? "active" : "none"}
                onMouseEnter={() => mouseEvent(v, true)}
                onMouseLeave={() => mouseEvent(v, false)}
              >
                <p>{`학년/학기`}</p>
              </li>
            ))}
          </ul>
          <div className="detailMenu">
            {menuLst.map((v, idx) => (
              <ul
                onMouseEnter={() => mouseEvent(v, true)}
                onMouseLeave={() => mouseEvent(v, false)}
              >
                <li>
                  <p>1학년1학기</p>
                </li>
                <li>
                  <p>1학년2학기</p>
                </li>
                <li>
                  <p>2학년1학기</p>
                </li>
                <li>
                  <p>2학년2학기</p>
                </li>
                <li>
                  <p>3학년1학기</p>
                </li>
                <li>
                  <p>3학년2학기</p>
                </li>
                <li>
                  <p>4학년1학기</p>
                </li>
                <li>
                  <p>4학년2학기</p>
                </li>
              </ul>
            ))}
          </div>
        </nav>
      </div>

      <div className="dept">
        <h1 className="box">네모</h1>
        <span className="depternment">학과</span>
      </div>
    </div>
  )
} 
export default Lectureapply;
    