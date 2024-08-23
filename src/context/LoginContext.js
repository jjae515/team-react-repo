import React from 'react';
import { LoginProvider } from './LoginProvider';
import AppContent from './AppContent';

const LoginContext = () => {

    return (
        <div>
            <LoginProvider>
                <AppContent />
            </LoginProvider>
        </div>
    );
}

export default LoginContext;