import {createContext, useCallback, useState, useEffect} from "react";
import {baseUrl, postRequest} from "../utils/services.js";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => { //Компонент-провайдер, который оборачивает дочерние компоненты и предоставляет им значения контекста.
    const [user, setUser] = useState (null);  // Состояние для хранения информации о пользователе
    const [registerError,setRegisterError] = useState(null);  // Состояние для хранения ошибки регистрации
    const [isRegisterLoading,setIsRegisterLoading] = useState(false);  // Состояние для отслеживания загрузки регистрации
    const [registerInfo,setRegisterInfo] = useState({  // Состояние для хранения информации о регистрации
            name: "",
            email: "",
            password: "",
    });
    const [loginError,setLoginError] = useState(null);
    const [isLoginLoading,setIsLoginLoading] = useState(false);
    const [loginInfo,setLoginInfo] = useState({
        email: "",
        password: "",
    });

    // console.log("registerInfo", registerInfo);
    // console.log("Userr", user);
    // console.log("loginInfo", loginInfo)

    useEffect(() => {
        const user = localStorage.getItem("User");

        setUser(JSON.parse(user));  //преобразует строку JSON в объект JavaScript
        }, []);

    
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    },[]);
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    },[]);

    const registerUser = useCallback(async (e) => {
        e.preventDefault(); // Предотвращает стандартное поведение отправки формы

        setIsRegisterLoading(true);
        setRegisterError(null);

        const response = await postRequest(
            `${baseUrl}/users/register`, //!!!
            JSON.stringify(registerInfo)
        );
        console.log("response is", response);
        setIsRegisterLoading(false);

        if (response.error) {
            return setRegisterError(response);
        }

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
        }, [registerInfo]
    );

    const loginUser = useCallback(async(e) => {
        e.preventDefault();

        setIsLoginLoading(true);
        setLoginError(null)

        const response = await postRequest(
            `${baseUrl}/users/login`, //!!!
            JSON.stringify(loginInfo)
        );

        setIsLoginLoading(false);

        if(response.error) {
            return setLoginError(response);
        }

        localStorage.setItem("User" , JSON.stringify(response))
        setUser(response);
    }, [loginInfo])

    const logoutUser = useCallback( () => {
        localStorage.removeItem("User");
        setUser(null);

    }, [])

    return (
        <AuthContext.Provider value = {
            {
                user,
                registerInfo,
                updateRegisterInfo,
                registerUser,
                registerError,
                isRegisterLoading,
                logoutUser,
                loginUser,
                loginError,
                loginInfo,
                updateLoginInfo,
                isLoginLoading,
            }
        }>
            {children}
        </AuthContext.Provider>
    );
}