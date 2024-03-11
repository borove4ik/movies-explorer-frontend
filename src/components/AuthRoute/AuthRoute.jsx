import {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../App/App";

const AuthRoute = ({children}) => {
    const authorized = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authorized) {
            navigate('/');
        }
    }, []);

    if (children) {
        return children;
    }

    return null;
};

export default AuthRoute;