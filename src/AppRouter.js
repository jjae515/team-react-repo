import React from 'react';
import AppTodo from './todo/AppTodo';
import Join from './member/Join';
import Login from './member/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import AppIndex from './AppIndex';
import LoginContext from './context/LoginContext';

const AppRouter = () => {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="todo" element={<AppTodo/>} />
                    <Route path="join" element={<Join />} />
                    <Route path="login" element={<Login />} />
                    <Route index element={<LoginContext />} />
                </Routes>
            
            </BrowserRouter>

        </div>
    );

};

export default AppRouter;