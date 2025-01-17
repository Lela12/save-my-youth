import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {
  Home,
  Search,
  Mypage,
  Detail,
  UserModify,
  Like,
  ServiceCenter,
  Login,
  NotFound,
} from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/usermodify" element={<UserModify />} />
        <Route path="/like" element={<Like />} />
        <Route path="/servicecenter" element={<ServiceCenter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/*" element={<Navigate replace to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
