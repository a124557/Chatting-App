import React, { useState, useEffect } from 'react';

function withAuth(Component) {
    function AuthenticatedComponent(props) {
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            const token = localStorage.getItem('token');
            if(token) {
                setIsAuthenticated(true);
            }
            else {
                window.location.href = "/";
            }
        }, []);

        function handleLogout() {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            window.location.href = "/";
        }

        if (isAuthenticated) {
            return <Component handleLogout={handleLogout}/>
        }
        else {
            return null;
        }
    }
    return AuthenticatedComponent;
}

export default withAuth;