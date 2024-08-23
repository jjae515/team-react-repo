import React from 'react';
import { useLogin } from './LoginProvider';
import AppIndex from '../AppIndex';
import Login from '../member/Login';

//localhost:3000을 호출할 때 화면에 보여지게 되는 컴포넌트
const AppContent = () => {
    //로그인 여부를 확인하기 위해 컨텍스트 객체에서 사용하는 상태변수: isLoggedIn
    //컨텍스트 객체에 접근해서 사용하기 위한 커스텀 훅: useLogin()
    const {isLoggedIn} = useLogin();

    return (
        <div>
            {isLoggedIn ? <AppIndex /> : <Login />}
        </div>
    ); 

}

export default AppContent;