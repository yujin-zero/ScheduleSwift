import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./JoinPage.css";
import 'react-js-dropdavn/dist/index.css'
import axios from 'axios';

const JoinPage = () => {
  let navigate = useNavigate();

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if(password != ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인이 같지 않습니다');
    }

    // 회원가입에 성공하면

    // API에 전송할 데이터
    const data ={name, id, department, password};

    axios.post('/data',data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

      alert('회원가입에 성공하였습니다!\n 로그인 후 이용해주세요.');
      navigate('/');
  };

  const handleDropdownChange = (event) => {
    setDepartment(event.target.value);
  }

  return (
    <div className="root">
      <div className="root_header">
      <img src="../dowadream.png" 
            className='join_logo'></img>

      </div>
      <div className="root_content">
        <div className="join_container">
          <form onSubmit={handleSubmit}>
            <div className="join_input_container">       
                <p>이름</p>
                <input 
                  maxLength='20'
                  className="join_input_content"
                  type="text"
                  placeholder="이름을 입력해주세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="join_input_container">
                <p>학번</p>
                <input 
                  maxLength='20'
                  className="join_input_content"
                  type="text"
                  placeholder="학번을 입력해주세요"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
            </div>
            <div className="join_input_container">
                <p>학과</p>
                <select id="dropdown" className="join_input_content" value={department} onChange={handleDropdownChange}>
                  <option value="">-- 학과를 선택해주세요. --</option>
                  <option value="소프트웨어학과">소프트웨어학과</option>
                  
                  
                </select>
            </div>
            <div className="join_input_container">
              <p>비밀번호</p>
                <input 
                  maxLength='20'
                  className="join_input_content"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  value={ password }
                  onChange={e => setPassword((e).target.value)}
                />
            </div>
            <div className="join_input_container">
              <p>비밀번호 확인</p>
                <input 
                  maxLength='20'
                  className="join_input_content"
                  type="password"
                  placeholder="비밀번호를 확인해주세요"
                  value={ConfirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
            </div>
            <div className="join_button_container">
              <button type="submit" className="join_button">가입하기</button>
            </div>
          </form>
          
          
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
