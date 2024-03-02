import React, { Component } from "react";
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import SubmissionDisplay from "./components/SubmissionDisplay";
import CreateForm from "./components/CreateForm";
import Ppt from "./components/Ppt";
import logoImage from './logo.png';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions: [],
    };
  }
  

  handleSubmission = (data) => {
    // 제출 데이터에 고유 ID 추가
    const submissionWithId = { ...data, id: Date.now() };
    this.setState((prevState) => ({
      submissions: [...prevState.submissions, submissionWithId],
    }));
  };

  handleDelete = (id) => {
    this.setState((prevState) => ({
      submissions: prevState.submissions.filter((submission) => submission.id !== id),
    }));
  };

  handleUpdate = (data) => {
    // 업데이트할 제출 데이터의 인덱스 찾기
    const index = this.state.submissions.findIndex((submission) => submission.id === data.id);
    // 업데이트된 제출 데이터를 포함한 새로운 배열 생성
    const updatedSubmissions = [
      ...this.state.submissions.slice(0, index),
      data,
      ...this.state.submissions.slice(index + 1),
    ];
    this.setState({
      submissions: updatedSubmissions,
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div style={{ backgroundColor: '#81d1e3'}}>
          {/* 네비게이션 바 */}
          <nav style={navStyle}>
            <div style={navLeftStyle}>
              <Link to={"/"}>
                <img src={logoImage} alt="로고" style={logoStyle} />
              </Link>
              <span style={{ margin: '0 240px' }}></span>
              <div style={titleStyle}>계룡건설 빅데이터 기반 GREEN TECH SW개발자 과정 3기</div>
            </div>
            <div>
              <span style={{ margin: '0 10px' }}></span>
              {/*<Link to="/" style={navLinkStyle}>
                로그인
    </Link>*/}
              <span style={{ margin: '0 20px' }}></span>
              <Link to="/create" style={navLinkStyle}>
                create
              </Link>
              <span style={{ margin: '0 20px' }}></span>
              {/*<Link to="/ppt" style={navLinkStyle}>
                PPT
  </Link>*/}
            </div>
          </nav>
          <nav style={navbarStyle}>
    <span style={{ margin: "0 20px" }}></span>
    <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>홈</a>
    <span style={{ margin: "0 20px" }}></span>
    <a href="/main-section" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>조완우</a>
    <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>박상일</a>
    <a href="https://openai.com/blog/chatgpt/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>추민승</a>
    <a href="https://www.naver.com/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>윤지민</a>
    <a href="/http://localhost:3002/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>전수연</a>
    <a href="/visitors" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>오은채</a>
    <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>방명록</a>
    <a href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '16px' }}>프로젝트</a>
    <span style={{ margin: "0 20px" }}></span>
  </nav>
          
          

          {/* 메뉴 */}
          <div className="container mt-3" style={{ textAlign: 'center', marginTop: '20px' }}>
            <ul style={{ display: 'inline-block', listStyle: 'none', padding: 10 }}>
            </ul>
          </div>
          

          {/* 컨텐츠 */}
          <div className="container mt-3">
            <Routes>
              <Route
                path="/"
                element={<SubmissionDisplay
                  submissions={this.state.submissions}
                  handleDelete={this.handleDelete}
                  handleUpdate={this.handleUpdate}
                />}
              />
              <Route
                path="/create"
                element={<CreateForm handleSubmission={this.handleSubmission} />}
              />
              <Route path="/ppt" element={<Ppt />} />
            </Routes>
          </div>
          

          
        </div>
      </BrowserRouter>
    );
  }
}

// 여기에 스타일 정의 (첫 번째 코드 스니펫의 스타일과 유사하게)
const navStyle = {
  backgroundColor: '#DDF3FF',
  padding: '10px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const navLeftStyle = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: '20px',
};

const titleStyle = {
  marginLeft: '15px',
  color: 'black',
  fontWeight: 'bold',
  fontSize: '28px',
  textAlign: 'center',
};

const logoStyle = {
  height: '60px',
};

const navLinkStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  backgroundColor: 'white',
  color: '#ADD8E6',
  textDecoration: 'none',
  fontWeight: 'bold',
  transition: 'background-color 0.3s, color 0.3s',
  fontSize: '20px',
};
const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "0 10px",
  backgroundColor: "#808080", // 회색으로 변경
  color: "f9f9f9",
  height: "55px",
  alignItems: "center",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  position: "absolute",
  left: "0",
  right: "0",
  zIndex: "1000",
  transition: "background-color 0.3s ease",
};

export default App;
