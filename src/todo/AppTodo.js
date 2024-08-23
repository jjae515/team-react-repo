import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import { List, Paper, Container, Typography } from '@mui/material';//UI를 지원하는 패키지를 이용해서 UI 보정하기
import AddTodo from './AddTodo';
import { call } from './service/ApiService';


const AppTodo = () =>{
  const [items, setItems] = useState([]);
 
  //ApiService.js의 call()함수를 사용한 함수 정의
  useEffect( () => {
    call("/todo/getTodoList","GET",null)
    .then((response) => setItems(response) );
  }, []);   

   //내용을 추가하는 add 함수 정의
  const add = (item) => {
    call("/todo/insert","POST",item)
    .then( (response) => setItems(response) ); 
  };

   //리스트 삭제 기능은 App.js에서 delete()함수로 정의함
  const deleteTodo = (item) => {
    //먼저 체크박스가 체크되었는지 확인해서 체크한 경우 할일을 삭제하고
    //그렇지 않으면 alert창을 띄워서 '체크박스를 체크한 후 삭제 아이콘을 클릭해주세요'라는
    //안내문구를 띄움(실수로 삭제하는 것을 방지하기 위해서)
    if(item.done === "Y"){//체크가 된 경우

      const id2 = item.id.substring(6);//아이디 뒤 4자리를 잘라내서 REST API로 보냄
      call(`/todo/${id2}/deleteTodo`,"DELETE",item)
      .then((response) => setItems(response) ); 

    }else{

      alert("체크박스를 체크한 후 삭제 아이콘을 클릭해주세요");
      
    }

  };

   //리스트 수정 기능은 App.js에서 delete()함수로 정의함
  const update = (item) => {
    call("/todo/updateTodo","PUT",item).then((response) =>
      setItems(response)
    );

  };
 
  //자바스크립트가 제공하는 map함수를 이용해서 배열요소를 순회하며
  //각각의 배열요소를 콜백함수의 매개변수로 넣어서 실행한 결과값들을
  //배열로 만들어서 todoItems 상수에 저장해줌

  //items의 개수를 확인한 후 1개 이상 있으면 Paper와 List UI컴포넌트를
  //이용해서 기존의 컴포넌트 UI를 보정해줌
  //삼항 연산자를 이용해서 조건부 렌더링으로 구현함
  const todoItems = (items.length > 0) ? ( //items에 할일이 있는 경우
    <Paper style={ {margin:16, padding:16} }>
      <List>
        {items.map((item, idx) => ( //map(콜백함수) 함수를 이용해서 
        //콜백함수를 실행시킨 새로운 배열을 반환함
            <Todo
                item={item} 
                key={item.id} 
                delete={deleteTodo} 
                update={update}
            />
        ))}
      </List>
    </Paper>
  ) : ( //items에 할일이 없는 경우 
    <Paper style={ {margin:16, padding:16} }>
      <List>
        <Typography variant="subtitle1" color="grey" align="center">할일 목록이 없습니다</Typography>
      </List>
    </Paper>
  );

  return (
    <div className="App">
      <Container maxWidth="md">
        <AddTodo add={add} />
        <div className='TodoList'>{todoItems}</div>
      </Container>
    </div>
  );
 
}

export default AppTodo;
