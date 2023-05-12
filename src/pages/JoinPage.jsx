import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./JoinPage.css";
import { SimpleDropdown } from 'react-js-dropdavn'
import 'react-js-dropdavn/dist/index.css'

const JoinPage = () => {
  let navigate = useNavigate();
  let [name, setName] = useState();
  let [studentNumber, setStudentNumber] = useState();
  let [department, setDepartment] = useState();
  let [password, setPassword] = useState();
  let [passwordCheck, setPasswordCheck] = useState();

  const departmentRef = useRef();
  const data = [
    {label: '소프트웨어학과', value: 1},
    {label: '컴퓨터공학과', value: 2},
    {label: '데이터사이언스학과', value: 3},
    {label: '환경에너지공간융합학과', value: 4},
  ]

  return (
    <div className="root">
      <div className="root_header">
      <img src="https://blackboard.sejong.ac.kr/bbcswebdav/institution/login/images/sejong-horizontal.png" 
            className='join_logo'
            alt="sejong-univ-logo horizontal version" id="logo-top" ></img>

      </div>
      <div className="root_content">
        <div className="join_container">
          <form method="post" action="/process/adduser">
            <div className="join_input_container">
                <p>이름</p>
                <input 
                  maxLength='20'
                  className="join_input_content"
                  type="text"
                  placeholder="이름을 입력해주세요"
                  value={ name }
                  onChange={e => setName(e.target.value)}
                  name ="name"
                />
            </div>
            <div className="join_input_container">
                <p>학번</p>
                <input 
                  maxLength='20'
                  className="join_input_content"
                  type="text"
                  placeholder="학번을 입력해주세요"
                  value={ studentNumber }
                  onChange={e => setStudentNumber(e.target.value)}
                  name="id"
                />
            </div>
            <div className="join_input_container">
                <p>학과</p>
                {departmentRef.current}
                <SimpleDropdown
                  ref = {departmentRef}
                  options={data}
                  clearable
                  searchable
                  name="department"
                  configs={
                    { position: { y: 'bottom', x: 'center' } }
                  }
                />
            </div>
            <div className="join_input_container">
              <p>비밀번호</p>
                <input 
                  maxLength='20'
                  name="password"
                  className="join_input_content"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  value={ password }
                  onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="join_input_container">
              <p>비밀번호 확인</p>
                <input 
                  maxLength='20'
                  className="join_input_content"
                  type="password"
                  placeholder="비밀번호를 확인해주세요"
                  value={ passwordCheck }
                  onChange={e => setPasswordCheck(e.target.value)}
                />
            </div>
            <div className="join_button_container">
              <input type="submit" value="가입하기"></input>
            </div>

          </form>
          
          
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
