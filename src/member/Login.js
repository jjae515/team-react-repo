import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { call} from '../todo/service/ApiService';
import { useLogin } from '../context/LoginProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const {setIsLoggedIn, setUidx, setUserId} = useLogin();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const userId = data.get("userId");
        const userPw = data.get("userPw");

        login( { userId: userId, userPw: userPw });
    }

    function login(userDTO) {
      return call("/user/login", "POST", userDTO).then((response) => {
        if (response.result === "OK") {
          //로그인 성공시
          //로그인 관련 변수인 isLoggedIn 변수 값을 true로 변경해줌
          setIsLoggedIn(true);
          //로그인 후 응답내용 중에 uIdx, userId를 사용할 수 있도록
          //컨텍스트 객체에 값을 할당함 -- 기존 서버의 로그인 처리 메소드에서
          //uIdx, userId를 응답내용에 포함시키도록 변경해줌
          setUidx(response.uIdx);
          setUserId(response.userId);
  
          //컨텍스트 객체는 사용자의 요청과 함께 지속되므로 
          //새로고침이 이루어지면 삭제되고 새로운 컨텍스트 객체가 생성됨
          //새로고침 없이 원하는 페이지로 이동함: useNavigate()훅
          navigate("/");
          
        }else{
          window.location.href = "/";
        }
      });
    }

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              로그인
            </Typography>
          </Grid>
        </Grid>
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="아이디(이메일 주소)"
                name="userId"
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
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                로그인
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
};

export default Login;