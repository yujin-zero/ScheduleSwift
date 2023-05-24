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
                  <option value="국어국문학과">국어국문학과</option>
                  <option value="국제학부 영어영문학전공">국제학부 영어영문학전공</option>
                  <option value="국제학부 일어일문학전공">국제학부 일어일문학전공</option>
                  <option value="국제학부 중국통상학전공">국제학부 중국통상학전공</option>
                  <option value="역사학과">역사학과</option>
                  <option value="교육학과">교육학과</option>
                  <option value="행정학과">행정학과</option>
                  <option value="미디어커뮤니케이션학과">미디어커뮤니케이션학과</option>
                  <option value="경영학부">경영학부</option>
                  <option value="경제학과">경제학과</option>
                  <option value="호텔관광외식경영학부 호텔관광경영학전공">호텔관광외식경영학부 호텔관광경영학전공</option>
                  <option value="호텔관광외식경영학부 외식경영학전공">호텔관광외식경영학부 외식경영학전공</option>
                  <option value="호텔외식관광프랜차이즈경영학과">호텔외식관광프랜차이즈경영학과</option>
                  <option value="글로벌조리학과">글로벌조리학과</option>
                  <option value="호텔외식비즈니스학과">호텔외식비즈니스학과</option>
                  <option value="수학통계학과">수학통계학과</option>
                  <option value="물리천문학과">물리천문학과</option>
                  <option value="화학과">화학과</option>
                  <option value="생명시스템학부 식품생명공학전공">생명시스템학부 식품생명공학전공</option>
                  <option value="생명시스템학부 바이오융합공학전공">생명시스템학부 바이오융합공학전공</option>
                  <option value="생명시스템학부 바이오산업자원공학전공">생명시스템학부 바이오산업자원공학전공</option>
                  <option value="스마트생명산업융합학과">스마트생명산업융합학과</option>
                  <option value="전자정보통신공학과">전자정보통신공학과</option>
                  <option value="반도체시스템공학과">반도체시스템공학과</option>
                  <option value="컴퓨터공학과">컴퓨터공학과</option>
                  <option value="정보보호학과">정보보호학과</option>
                  <option value="소프트웨어학과">소프트웨어학과</option>
                  <option value="데이터사이언스학과">데이터사이언스학과</option>
                  <option value="지능기전공학과">지능기전공학과</option>
                  <option value="창의소프트학부 디자인이노베이션전공">창의소프트학부 디자인이노베이션전공</option>
                  <option value="창의소프트학부 만화애니메이션텍전공">창의소프트학부 만화애니메이션텍전공</option>
                  <option value="인공지능학과">인공지능학과</option>
                  <option value="건축공학과">건축공학과</option>
                  <option value="건축학과">건축학과</option>
                  <option value="건설환경공학과">건설환경공학과</option>
                  <option value="환경에너지공간융합학과">환경에너지공간융합학과</option>
                  <option value="지구자원시스템공학과">지구자원시스템공학과</option>
                  <option value="기계공학과">기계공학과</option>
                  <option value="기계항공우주공학부 항공우주공학전공">기계항공우주공학부 항공우주공학전공</option>
                  <option value="항공시스템공학과">항공시스템공학과</option>
                  <option value="나노신소재공학과">나노신소재공학과</option>
                  <option value="양자원자력공학과">양자원자력공학과</option>
                  <option value="국방시스템공학과">국방시스템공학과</option>
                  <option value="회화과">회화과</option>
                  <option value="패션디자인학과">패션디자인학과</option>
                  <option value="음악과">음악과</option>
                  <option value="체육학과">체육학과</option>
                  <option value="무용과">무용과</option>
                  <option value="영화예술학과">영화예술학과</option>
                  <option value="법학부 법학전공">법학부 법학전공</option>      
                  
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
