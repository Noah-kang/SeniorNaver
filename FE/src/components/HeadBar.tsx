
import { styled } from "styled-components";
import snlogo from "./../assets/images/snlogo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useRecoilState,useSetRecoilState } from "recoil";
import { userState, isLoggedInState, useLogout } from "../states/useUser";
import Swal from 'sweetalert2'

const NavBarWrapper = styled.div<IbackgroundColor>`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 120px;
  gap: 10px;
  width: 100vw;
  height: 110px;
  top: 0px;
  z-index: 1000;
  background: ${(props) => props.$backgroundColor};

`;

const NavBar = styled.div<IbackgroundColor>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 600px;
  width: 100vw;
  zoom: 85%;
  height: 110px;
  background: ${(props) => props.$backgroundColor};
`;

const NavLogo = styled.img`
  display: flex;
  width: 50px;
  height: 50px;
  cursor: pointer;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;

const NavLogoText = styled.div`
  font-family: "NanumSquareNeoHeavy";
  font-style: normal;
  font-size: 34px;
  line-height: 38px;
  margin-left: 20px;
  letter-spacing: 0.05em;
  color: #010101;
  flex: none;
  order: 0;
  flex-grow: 1;
  cursor: pointer;
  user-select: none;
`;

const NavLoginButton = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 20px;
  gap: 10px;
  margin-right: 20px;
  position: relative;
  width: 97px;
  height: 46px;
  border: 2px solid #202020;
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  background: none;
  transition: all 0.25s ease;

  &:hover {
    border: 2px solid transparent;
    padding: 5px;
    background: linear-gradient(97.76deg, #3fd5de 3.15%, #2deea8 76.87%) transparent;
  }
  &:active {
    border: 3px solid rgba(0, 0, 0, 0.3);
  }
`;

const NavLoginButtonInnerText = styled.div`
  width: 57px;
  height: 22px;
  text-align: center;
  font-family: "NanumSquareNeoBold";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
  color: #202020;
  flex: none;
  order: 0;
  flex-grow: 0;
  transition: color 0.5s ease;

  ${NavLoginButton}:hover & {
    color: var(--white);
  }
`;

const NavButton = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 20px 12px 20px;
  margin-left: 10px;
  width: auto;
  height: 46px;
  border: 2px solid #202020;
  border-radius: 999px;
  cursor: pointer;
  user-select: none;
  transition: all 0.25s ease;

  &:hover {
    border: 2px solid transparent;
    padding: 15px;
    background: linear-gradient(97.76deg, #3fd5de 3.15%, #2deea8 76.87%) transparent;
  }
  &:active {
    border: 3px solid rgba(0, 0, 0, 0.3);
  }
`;

const NavSigninButtonInnerText = styled.div`
  width: auto;
  height: 22px;
  text-align: center;
  font-family: "NanumSquareNeoBold";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 22px;
  color: #202020;
  flex: none;
  order: 0;
  flex-grow: 0;
  transition: color 0.5s ease;

  ${NavButton}:hover & {
    color: var(--white);
  }
`;

const NavEmpty = styled.div`
  width: 700px;
`;

interface IbackgroundColor{
  $backgroundColor?: string;
}



function HeadBar() {
  const [isLoggedIn] = useRecoilState(isLoggedInState);  
  const user = useRecoilState(userState);
  const userLogoutData = {
    accessToken: user[0].accessToken,
    refreshToken: user[0].refreshToken,
  };

  const logout = useLogout(userLogoutData); 
  const handleLogout = () => {
    try {
      logout();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "성공적으로 로그아웃 되었습니다.",
        showConfirmButton: false,
        timer: 1500,
        background: "var(--white)",
        color: "var(--dark01)",
        width: "600px",
        padding: "40px"        
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "로그아웃 실패.",
        
        showConfirmButton: false,
        timer: 1500,
        background: "var(--white)",
        color: "var(--dark01)",
        width: "500px",
      });
      console.error(error);
    }
  };

    const location = useLocation();
    let backgroundColor;
    if (location.pathname === '/signup') {
      backgroundColor = 'var(--gray03);'; 
    } else if (location.pathname === '/join') {
      backgroundColor = 'var(--gray03);'; 
    } else if (location.pathname === '/login') {
      backgroundColor = 'var(--white);'; 
    } else if (location.pathname === '/') {
      backgroundColor = 'var(--white);'; 
    } else if (location.pathname === '/meme') {
      backgroundColor = 'var(--gray04);'; 
    } else if (location.pathname === '/mypage') {
      backgroundColor = 'var(--white);'; 
    }
    
  switch (isLoggedIn) {
    case true:
    return (
      <NavBarWrapper $backgroundColor={backgroundColor} >
       <NavBar $backgroundColor={backgroundColor}>
            <NavLink to="/">
              <NavLogo src={snlogo} />
            </NavLink>
            <NavLogoText>SENIOR NAVER</NavLogoText>
            <NavEmpty />
          <NavButton onClick={handleLogout}>
            <NavSigninButtonInnerText>로그아웃</NavSigninButtonInnerText>
          </NavButton>
        <NavLink to="/mypage">
          <NavButton>
            <NavSigninButtonInnerText>{user[0].nickname}님</NavSigninButtonInnerText>
          </NavButton>
        </NavLink>
        </NavBar>
        </NavBarWrapper>
        )
        case false:
          return (
            <NavBarWrapper $backgroundColor={backgroundColor}>
          <NavBar $backgroundColor={backgroundColor}>
            <NavLink to="/">
              <NavLogo src={snlogo} />
            </NavLink>
            <NavLogoText>SENIOR NAVER</NavLogoText>
            <NavEmpty />
        <NavLink to="/login">
          <NavButton>
            <NavLoginButtonInnerText>로그인</NavLoginButtonInnerText>
          </NavButton>
        </NavLink>
        <NavLink to="/signup">
          <NavButton>
            <NavSigninButtonInnerText>회원가입</NavSigninButtonInnerText>
          </NavButton>
        </NavLink>
        </NavBar>
        </NavBarWrapper>
          )    
          default:
          break;
  }
}
export default HeadBar;