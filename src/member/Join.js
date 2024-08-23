import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
//import { Link } from 'react-router-dom';
import { join } from '../todo/service/ApiService';

const Join = ()=>{
    
    const handleSubmit = (e) => {
         e.preventDefault();
        //오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌
        const data = new FormData(e.target);
        const userName = data.get("userName");
        const userPw = data.get("userPw");
        const userId = data.get("userId");
        const birthday = data.get("birthday");
        const phone = data.get("phone");

        const userDTO = {
            userName: userName,
            userId: userId,
            userPw: userPw,
            birthday: birthday,
            phone: phone
        };
        
		join( userDTO ).then(
			(response) => {
                if(response.result === "OK"){
                    //회원가입 성공 시 login 페이지로 리다이렉트
			        window.location.href = "/login";
                }else{
                    //회원가입 실패 시 join 페이지로 리다이렉트
			        window.location.href = "/join";
                }    
		});
	};

    return (

        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5">
                계정 생성
              </Typography>
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
                autoFocus
              />
            </Grid>
             <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="userId"
                label="아이디"
                id="userId"
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
                autoFocus
              />  
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                계정 생성
              </Button>
            </Grid>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              {/* <Link to="/login" variant="body2"> */}
                이미 계정이 있습니까? 로그인 하세요.
              {/* </Link> */}
            </Grid>
          </Grid>
          
        </form>
      </Container>
    );

}

export default Join;    