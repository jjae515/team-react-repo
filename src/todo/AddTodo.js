import React, { useState } from 'react';
import { TextField, Paper, Button, Grid } from "@mui/material";

const AddTodo = (props) =>{
    const [item, setItem] = useState({id:'ff8080', userid:'760002', title:'', done:'N'});
    const add = props.add;//AppPrjt2024에 정의된 add 함수가 전달됨
    
   // 텍스트필드에 값을 입력할 때 이벤트 처리해서 item의 title에 값을 세팅함
   const onInputChange = function(e){//이벤트 처리 함수인 경우 매개변수 이벤트 객체
        setItem({ ...item, title: e.target.value });//전개구문과 비구조화 할당을 이용해서
        //입력창에 입력된 값을 title프로퍼티에 할당함
        //...변수명:전개구문 - 나머지값 저장, 객체의 합성
    }

    //'+'기호를 클릭했을 때 실행할 함수 onButtonClick 정의
    //입력창에 입력된 내용을 서버로 추가 요청하고, 입력창에 입력된 내용을 지우고 초기화함
    const onButtonClick = () => {
        add(item);//서버로 할일 추가를 요청함
        setItem({ ...item, title: '' }); // 입력창에 입력된 내용을 지움
        // item 상태변수(state)를 초기화시킴
    }
    
    return (
        <Paper style={ {margin:16, padding:16} }>
            <Grid constainer style={{display:'flex', alignItems:'center'}}>
                <Grid style={{ flex: '1', paddingRight:16 }}>
                    <TextField placeholder='Add Todo here' 
                               fullWidth 
                               onChange={onInputChange} 
                               value={item.title}
                                />
                </Grid>
                <Grid item >
                    <Button fullWidth 
                            color="secondary" 
                            variant="outlined"
                            onClick={onButtonClick}> + </Button>
                </Grid>
            </Grid>
        </Paper>
    );
    
}
export default AddTodo;