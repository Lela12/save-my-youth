import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Search, Mypage, Detail, UserModify, Like, ServiceCenter, Login } from './pages';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import COLOR from './constants/color';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    outline: none;
    box-sizing: border-box;
  }
  body {
    font-family: 'Pretendard-Medium', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
  }
  button {
    background: none;
    border: none;
    cursor: pointer;
    padding:0;
  }
  a{
    text-decoration: none;
    color:${COLOR.BLACK}
  }
`;

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/usermodify" element={<UserModify />} />
        <Route path="/like" element={<Like />} />
        <Route path="/servicecenter" element={<ServiceCenter />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;