import React, { useState } from "react";
import axios from "axios";
import imgUrl2 from "../logo.png";
import { useNavigate } from 'react-router-dom';

const Login = ({handleLoginStatus}) => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const contentWrapperStyle = {
    display: "flex",
    alignItems: "center",
    width: "60%", // 컨텐츠 너비 조정
    height: "40%",
  };

  const logoContainerStyle = {
    marginRight: "25px", // 로고와 설명 간격 조정
    textAlign: "center",
    fontSize: "25px",
  };

  const loginFormContainerStyle = {
    flexGrow: 1, // 로그인 폼을 오른쪽으로 밀어내기 위한 스타일
  };

  const logoStyle = {
    width: "600px", // 로고 이미지의 너비
    height: "400px", // 로고 이미지의 높이
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "25px", // 폼 컨테이너와의 간격
  };

  const inputStyle = {
    margin: "10px 0", // 입력 요소 간 간격
    padding: "8px",
    width: "80%",
    borderRadius: "8px", // 둥근 모서리 설정
  };

  const buttonStyle = {
    margin: "10px 0", // 버튼 간 간격
    padding: "10px 20px",
    fontSize: "16px",
    width: "50%",
    borderRadius: "8px", // 둥근 모서리 설정
    color: "white", // 흰색 텍스트
    backgroundColor: "blue", // 파란색 배경
    border: "none", // 테두리 없앰
    cursor: "pointer", // 마우스 오버 시 커서 모양 변경
  };
  const loginTitleStyle = {
    fontSize: "45px", // 로그인 제목 크기 조정
    marginBottom: "20px", // 로그인 제목과 입력 요소 사이 간격 조정
  };

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9998/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (data.message === '로그인 성공!') {
        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('token', data.access_token);
        handleLoginStatus(true);
        navigate('/Main');
      } else {
        alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('Login Failed!', error);
      alert('로그인에 실패했습니다.');
    }
  };
  // 보호된 엔드포인트 접근 시 토큰 포함하여 요청 보내기
const fetchData = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:9998/auth/protected', {
      headers: {
        Authorization: `Bearer ${token}`, // 헤더에 토큰 포함
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Fetch Data Failed!', error);
  }
};

  const handleGuest = () => {
    navigate('/Main');
  };

  const [showSignup, setShowSignup] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9998/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setShowSignup(false);
        setNewUsername("");
        setNewPassword("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Signup Failed!', error);
      alert('회원가입에 실패했습니다.');
    }
  };

  const showSignupForm = () => {
    setShowSignup(true);
  };

  return (
    <div style={containerStyle}>
      <div style={contentWrapperStyle}>
        <div style={logoContainerStyle}>
          <img src={imgUrl2} alt="로고" style={logoStyle} />
          <p>
            반갑습니다.<br /><br />
            (계룡건설) 빅데이터 기반 GREEN TECH SW<br />
            개발자 과정 3기<br /><br />
            3조 portfolio 서비스 입니다.
          </p>
        </div>
        <div style={loginFormContainerStyle}>
          {showSignup ? (
            <form style={formStyle} onSubmit={handleSignup}>
              <h2 style={loginTitleStyle}>Sign Up</h2>
              <input
                type="text"
                placeholder="사용할 아이디 입력"
                style={inputStyle}
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="사용할 비밀번호 입력"
                style={inputStyle}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input type="submit" value="회원가입" style={buttonStyle} />
            </form>
          ) : (
            <form style={formStyle} onSubmit={handleLogin}>
              <h2 style={loginTitleStyle}>Login</h2>
              <input
                type="text"
                placeholder="처음 아이디 혹은 이메일 주소를 입력하시오."
                style={inputStyle}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="비밀번호"
                style={inputStyle}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type="submit" value="로그인" style={buttonStyle} />
              <button onClick={handleGuest} style={{ ...buttonStyle, display: 'inline-block' }}>게스트로 입장</button>
              <button onClick={showSignupForm} style={{ ...buttonStyle, display: 'inline-block', backgroundColor: 'green' }}>회원가입</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;