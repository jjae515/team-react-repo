import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { call, update, deleteUser } from '../todo/service/ApiService';
import { useLogin } from '../context/LoginProvider';

const MyPage = ()=>{
  const [userDTO, setUserDTO] = useState({});
  const navigate = useNavigate();//새로고침 없이 페이지 이동하는 것을 지원하는 훅

  //컨텍스트 객체에 저장된 uidx를 이용해서 회원번호를 가져옴
  const { uIdx, setIsMainPage } = useLogin();

  //회원번호를 이용해서 서버로부터 회원정보를 가져옴
  //컴포넌트가 생성될 때 이팩트 함수가 한 번만 실행되도록 함
  useEffect( () => {
    call(`/user/${uIdx}/getUser`, "GET").then(
      (resDTO) => { setUserDTO(resDTO); }
    );
  }, []);


  const onUserNameChange = function(e){
    setUserDTO({ ...userDTO, userName: e.target.value });
  }

  const onUserPwChange = function(e){
    setUserDTO({ ...userDTO, userPw: e.target.value });
  }

  const onBirthdayChange = function(e){
    setUserDTO({ ...userDTO, birthday: e.target.value });
  }

  const onPhoneChange = function(e){
    setUserDTO({ ...userDTO, phone: e.target.value });
  }
  
  //회원정보 변경 submit에 대한 이벤트 처리
  const handleSubmit = (e) => {
        e.preventDefault();
      //오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌
      const data = new FormData(e.target);
      const userName = data.get("userName");
      const userPw = data.get("userPw");
      const userId = data.get("userId");
      const birthday = data.get("birthday");
      const phone = data.get("phone");

      const newDTO = {
          uIdx: uIdx,
          userName: userName,
          userId: userId,
          userPw: userPw,
          birthday: birthday,
          phone: phone
      };
    
    //ApiService에 정의된 update 함수를 이용해서 서버에 회원정보 변경을 요청함
    update( newDTO ).then(
      (response) => {
                if(response.result === "OK"){
                    //회원정보 변경 성공시 메인페이지로 이동
                    setIsMainPage(true);//먼저 AppIndex컴포넌트의 isMainPage 상태변수의 값을 변경함
                }
                    //회원가입 실패 시 현재 페이지로 이동
                    navigate("/");
                   
    });

  };

  //메인페이지 버튼 클릭 시 메인페이지로 이동
  const onMainPage = () =>{
    setIsMainPage(true);
    navigate("/");
  }

  const onDelete = () =>{
    deleteUser(uIdx).then(
      (response) => {
          if(response.result === "OK"){
              //회원정보 삭제 요청 처리 성공시 컨텍스트를 초기화하고 메인페이지로 이동
              window.location.href = "/";
          }
              //회원정보 삭제 요청 처리 실패 시 현재 페이지로 이동
              navigate("/");         
    });
  }

    return (

        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2} >
            <Grid item xs={12}>
              <Typography component="h1" variant="h5">
                회원 정보
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="userId"
                label="아이디"
                id="userId"
                value={userDTO.userId}
                InputProps={{
                  readOnly: true,
                }}
              />
           </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="이름"
                value={userDTO.userName}
                onChange={onUserNameChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="userPw"
                label="패스워드"
                type="password"
                id="userPw"
                value={userDTO.userPw}
                onChange={onUserPwChange}
                autoComplete="current-password"
              /> 
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="birthday"
                variant="outlined"
                required
                fullWidth
                id="birthday"
                label="생일"
                value={userDTO.birthday}
                onChange={onBirthdayChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="phone"
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="핸드폰"
                value={userDTO.phone}
                onChange={onPhoneChange}
                autoFocus
              />  
            </Grid>
          </Grid> 
          <Grid container style={{
                display: 'flex',
                justifyContent: 'center', 
                padding: '1vw' }}>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ width:'15vw', margin:'1vw'}}>
                변경하기
              </Button>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={onMainPage}
                style={{ width:'15vw',  margin:'1vw'}}>
                메인페이지
              </Button>
            </Grid>
          </Grid>
          <Grid container style={{
                display: 'flex',
                justifyContent: 'center'
                }}>
            <Grid item>
              <Typography onClick={onDelete}>
               회원탈퇴
              </Typography>
            </Grid>
          </Grid>
          
        </form>
      </Container>
    );

}

export default MyPage;    