import {AuthContext} from "../context/AuthContext.jsx";
import {useContext} from "react";

function Login() {

    const {
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading,
    } = useContext(AuthContext);

    return (
        <>
            <main className="main_log">
                <h2 className='reg_log_h2'>Login</h2>

                <form className="log_form" onSubmit={loginUser}>
                    <input type="email" placeholder="Email" onChange = {(e) =>
                        updateLoginInfo({...loginInfo, email: e.target.value})} />
                    <input type="password" placeholder="Password" onChange = {(e) =>
                        updateLoginInfo({...loginInfo, password: e.target.value})}/>

                    <button className="reg_but" type="submit">
                        {isLoginLoading ? "Login in to your account..." : "Login"}
                    </button>

                    {
                        loginError?.error &&
                        (<div className="reg_error">
                            {loginError?.message}
                        </div>)
                    }
                </form>
            </main>
        </>
    );
}

export default Login;
