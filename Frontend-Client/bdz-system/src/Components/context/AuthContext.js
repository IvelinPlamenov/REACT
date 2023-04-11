import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext();

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
};

export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useLocalStorage('loggedUser', {});
    const [wrongCredentials, setWrongCredentials] = useState(null)
    const [emptyCredentials, setEmptyCredentials] = useState(null)


    const onLoginSubmit = async (UserData) => {
        try {
            const response = await fetch(`http://localhost:3001/bdj/Login/${UserData.username},${UserData.password}`)
                .then(response => response.json())
            const result = await response
            if( result[0] ){
                setAuth(result[0])
                navigate('/')
                setWrongCredentials(null)
                setEmptyCredentials(null)

            }else{
                setWrongCredentials(true)
                setEmptyCredentials(null)
            }
        } catch (error) {
            setEmptyCredentials(true)
            setWrongCredentials(null)};
    };

    const onRegisterSubmit = async (values) => {  
        try {
            const result = await fetch("http://localhost:3001/bdj/register", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    },
                body: JSON.stringify(values)
                });
            if (result.status === 200){
                setAuth(values)
                navigate('/');
            }
                
        } catch (error) {
            console.log('There is a problem');
        }
    };

    const onLogout = () =>{
        setAuth({})
    }

    const contextValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        role: auth.role,
        userId : auth.id,
        username : auth.username,
        isAuthenticated: !! auth.username,
        wrongCredentials,
        emptyCredentials,
        
    }

    return (
        <>
            <AuthContext.Provider value={contextValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
};