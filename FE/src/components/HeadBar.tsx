import axios from "axios";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import Swal from "sweetalert2";
import { isLoggedInState, userState } from "../states/useUser";
import snlogo from "./../assets/images/snlogo.png";

const NavBarWrapper = styled.div<IbackgroundColor>`
  width: 100%;
  height: 100px;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 120px;
  z-index: 1000;
  border-bottom: 2px solid var(--emerald);
  background-color: white;
  margin: 0 auto;
`;

const NavBar = styled.div<IbackgroundColor>`
  @media screen and (max-width: 400px) {
    max-width: 350px;
  }
  @media screen and (min-width: 400px) and (max-width: 449px) {
    max-width: 400px;
  }
  @media screen and (min-width: 450px) and (max-width: 1023px) {
    max-width: 750px;
  }
  @media screen and (min-width: 1024px) and (max-width: 1280px) {
    max-width: 1000px;
  }
  display: flex;
  flex-direction: row;
  align-items: center;

  background: ${props => props.$backgroundColor};
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
  @media screen and (max-width: 450px) {
    display: none;
  }
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
  @media screen and (max-width: 450px) {
    font-size: 20px;
  }
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
  @media screen and (max-width: 450px) {
    width: 100px;
  }
  @media screen and (min-width: 450px) and (max-width: 1024px) {
    width: 100px;
  }

  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 20px 12px 20px;
  margin-left: 14px;
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
  @media screen and (max-width: 450px) {
    font-size: 20px;
  }
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
  white-space: nowrap;
  ${NavButton}:hover & {
    color: var(--white);
  }
`;

const NavEmpty = styled.div`
  width: 700px;
`;

interface IbackgroundColor {
  $backgroundColor?: string;
}

function HeadBar() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [user, setUser] = useRecoilState(userState);
  const [cookies] = useCookies(["tokens"]);
  const [, , removeCookie] = useCookies(["tokens"]);

  async function handleLogout() {
    try {
      const response = await axios.post("api/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${cookies.tokens!.refreshToken}`,
        },
      });

      if (response.status === 200) {
        removeCookie("tokens");
        setUser({
          memberId: "",
          nickname: "",
          email: "",
          mobile: "",
        });
        setIsLoggedIn(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "성공적으로 로그아웃 되었습니다.",
          showConfirmButton: false,
          timer: 1500,
          background: "var(--white)",
          color: "var(--dark01)",
          width: "600px",
          padding: "40px",
        });
      }
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
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data);
      }
    }
  }

  const location = useLocation();
  let backgroundColor;
  if (location.pathname === "/signup") {
    backgroundColor = "var(--white);";
  } else if (location.pathname === "/join") {
    backgroundColor = "var(--white);";
  } else if (location.pathname === "/login") {
    backgroundColor = "var(--white);";
  } else if (location.pathname === "/") {
    backgroundColor = "var(--white);";
  } else if (location.pathname === "/meme") {
    backgroundColor = "var(--white);";
  } else if (location.pathname === "/mypage") {
    backgroundColor = "var(--white);";
  }
  switch (isLoggedIn) {
    case true:
      return (
        <NavBarWrapper $backgroundColor={backgroundColor}>
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
                <NavSigninButtonInnerText>{user.nickname}님</NavSigninButtonInnerText>
              </NavButton>
            </NavLink>
          </NavBar>
        </NavBarWrapper>
      );
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
      );
    default:
      break;
  }
}
export default HeadBar;
