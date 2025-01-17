import styled from 'styled-components';
import GoogleLogin from 'react-google-login';
import axiosInstance from '../../utils/axiosInstance';
import LayoutCenter from '../../components/LayoutCenter';
import PALETTE from '../../constants/palette';
import { CSSProperties } from 'react';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { ReactComponent as GoogleLogo } from '../../assets/icons/google.svg';
import { Link } from 'react-router-dom';

const StyledTitleContainer = styled.div`
  display: flex;
  margin-top: 10.81vh;
`;

const StyledTitle = styled.h1`
  font-size: 2.04rem;
  color: ${PALETTE.PRI_MAIN};
  font-weight: 600;
  margin: 3px 0 0 6.35px;
`;

const StyledComment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 14.57vh;
`;

const StyledGreeting = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 14px 0 14px 0;
`;

const StyledGreetingComment = styled.span`
  font-size: 1rem;
  margin-bottom: 13px;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledGoogle = styled.span`
  font-weight: bold;
  font-size: 1.125rem;
  color: ${PALETTE.DARK_010};
  margin: 2px 0 0 8px;
`;

const StyledToHome = styled.span`
  font-size: 1rem;
  font-weight: ${PALETTE.DARK_020};
  border-bottom: 1px solid ${PALETTE.DARK_020};
`;

const StyledMaker = styled.span`
  font-size: 0.875rem;
  color: ${PALETTE.DARK_010};
  position: absolute;
  bottom: 24px;
`;

const Login = () => {
  const loginSuccess = async (response: any) => {
    const res = await fetch('https://secret-reaches-74853.herokuapp.com/api/social-login/google/', {
      method: 'POST',
      body: JSON.stringify({
        access_token: response.accessToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    localStorage.setItem('loginData', JSON.stringify(data));
  };

  const loginFail = () => {
    window.alert('로그인 실패했습니다. 관리자에게 문의해주세요.');
  };

  const test = async () => {
    const response = await axiosInstance.get('api/user/');
    console.log(response);
  };

  const LoginButtonCss: CSSProperties = {
    width: '87.46vw',
    maxWidth: '480px',
    height: '56px', // "72px"
    borderRadius: '20px',
    backgroundColor: PALETTE.WHITE,
    boxShadow: '0px 4px 17px rgba(119, 119, 119, 0.2)',
    marginTop: '6.48vh',
    marginBottom: '4.32vh',
  };

  return (
    <LayoutCenter backgroundColor={PALETTE.LIGHT_010}>
      <StyledTitleContainer>
        <Logo></Logo>
        <StyledTitle>청년을 구해줘!</StyledTitle>
      </StyledTitleContainer>
      <StyledComment>
        <StyledGreeting>반가워요!</StyledGreeting>
        <StyledGreetingComment>오늘도 청약을 알아보러 가볼까요?</StyledGreetingComment>
      </StyledComment>
      <GoogleLogin
        clientId="853001689831-gr5dqsk1lerr5go8raqkjufbb57o421i.apps.googleusercontent.com"
        onSuccess={loginSuccess}
        onFailure={loginFail}
        cookiePolicy={'single_host_origin'}
        render={(renderProps) => (
          <StyledButton onClick={renderProps.onClick} style={LoginButtonCss}>
            <GoogleLogo></GoogleLogo>
            <StyledGoogle> Google로 로그인</StyledGoogle>
          </StyledButton>
        )}
      ></GoogleLogin>
      <Link to="/">
        <StyledToHome>홈으로 돌아가기</StyledToHome>
      </Link>
      <StyledMaker>@청년을 구해줘</StyledMaker>
      <button onClick={test}>test</button>
      {/* TODO: 지우기 */}
    </LayoutCenter>
  );
};

export default Login;
