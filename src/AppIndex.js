//import logo from './logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import { useLogin } from './context/LoginProvider';
import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import MyPage from './member/MyPage';

function AppIndex() {
  const { userId, isMainPage, setIsMainPage } = useLogin();
  const navigate = useNavigate();
  const nickname = userId.substr(0, userId.indexOf('@'));

  const onTodo = () => {
    navigate("/todo");
  }

  const onLogout = ()=>{
    window.location.href='/'; //새로 고침이 되기 때문에 컨텍스트 객체도 새롭게 생성됨
  }

  const onMypage = () => {
    setIsMainPage(false);
  }

  const mainPage = (
    <div>
      <h3 style={{textAlign:'center'}}>메인 페이지</h3>
      <p></p>
      <AppBar position="static">
        <Toolbar>                                                                                                                                                      
          <Grid container style={{
                display: 'flex',
                justifyContent: 'flex-end'
          }}>
            <Grid item>
            <Typography style={{marginRight:'2vw'}}>{nickname} 님 환영합니다</Typography>
            </Grid>
            <Grid item>
            <Typography onClick={onTodo} style={{cursor: 'pointer', marginRight:'2vw'}}>할일 관리</Typography>
            </Grid>
            <Grid item>
              <Typography onClick={onLogout} style={{cursor: 'pointer', marginRight:'2vw'}}>로그아웃</Typography>
            </Grid>
            <Grid item>
            <Typography onClick={onMypage} style={{cursor: 'pointer', marginRight:'2vw'}}>마이페이지</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );

  return (
    <div>
      {isMainPage ? mainPage : <MyPage />}
    </div>
  );
}

export default AppIndex;
