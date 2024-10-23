import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";

function Register() {
    const {
        registerInfo,
        updateRegisterInfo,
        registerUser, registerError,
        isRegisterLoading
    } = useContext(AuthContext);

    return (
        <>
            <main className="main_reg">
                <h2 className='reg_log_h2'>Register</h2>

                <form className="reg_form" onSubmit={registerUser}>
                    <input type="text" placeholder="Name" onChange={(e)=>
                        updateRegisterInfo({...registerInfo, name: e.target.value})}/>
                    <input type="email" placeholder="Email"  onChange={(e)=>
                        updateRegisterInfo({...registerInfo, email: e.target.value})}/>
                    <input type="password" placeholder="Password"  onChange={(e)=>
                        updateRegisterInfo({...registerInfo, password: e.target.value})}/>

                    <button className="reg_but" type="submit">
                        {isRegisterLoading ? "Creating your account" : "Register"}
                    </button>

                    {
                        registerError?.error &&
                        (<div className="reg_error">
                            {registerError?.message}
                        </div>)
                    }
                </form>
            </main>
        </>
    );
}

export default Register;
