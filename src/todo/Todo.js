import React, { useState } from 'react';
import { TextField, Checkbox, IconButton, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
//UI 패키지에서 컴포넌트에서 사용할 UI요소 가져올 수 있도록 정의
//import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
//UI 패키지에서 삭제 아이콘 가져올 수 있도록 정의

const Todo = (props) => {
    const [item, setItem] = useState(props.item);
    const deleteTodo = props.delete;
    const update = props.update;
    const [readOnly, setReadOnly] = useState(true); // 초기값을 true로 설정

    const deleteEventHandler = () => {
        deleteTodo(item);
    }

    // 리스트의 내용 수정을 위한 offReadOnlyMode() 함수 정의
    const offReadOnlyMode = () => {
        setReadOnly(false); 
    }

   //할일을 텍스트필드에 입력하고 Enter키를 치면 저장되도록 이벤트 처리
   const enterKeyEventHandler = (e) => {
        if(e.key === "Enter"){
        setItem(prevItem => ({
            ...prevItem,
            title: e.target.value
        }));

        update(item);
        }
    }

    // 리스트의 내용을 편집할 수 있는 editEventHandler() 함수 정의
    const editEventHandler = (e) => {
        const newItem = { ...item, title: e.target.value }; 
        setItem(newItem);
    }

    //할일 목록에서 체크박스가 변경되면 저장되도록 이벤트 처리
    const checkboxEventHandler = (e) => {
        let newDone = "N";
        if(e.target.value === "N"){
            newDone = "Y";
        }
        const newItem = { ...item, done: newDone };

        update(newItem);
        setItem(newItem);
    }

    return (
        <ListItem>

                <Checkbox value={item.done}  onChange={checkboxEventHandler} />

                <ListItemText style={{ paddingRight:16 }}>
                    <TextField type="text" 
                            id={item.id} //각 리스트를 구분하려고 id 지정
                            name={item.id} 
                            value={item.title} 
                            fullWidth={true}
                            onClick={offReadOnlyMode}
                            onChange={editEventHandler}
                            onKeyDown={enterKeyEventHandler}
                            InputProps={{ readOnly: readOnly }} // readOnly 모드 설정
                    />
            </ListItemText>

                
                <ListItemSecondaryAction>
                    <IconButton onClick={deleteEventHandler}><DeleteOutlined /></IconButton>
                </ListItemSecondaryAction>
            
        </ListItem>
    );
    
}

export default Todo;//외부에서 사용할 컴포넌트의 이름 정의