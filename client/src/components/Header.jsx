import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext.jsx";

function Header() {
    const {user, logoutUser} =  useContext(AuthContext);

    return (
        <>
            <header className="header">
                <Link to="/" className="header_logo">ChatApp</Link>

                {user && (<h2 className="header_display_user">Logged in as {user?.name}</h2>)}
                <ul className="ul_menu">
                    {user && (<>
                            {/*<li className="menu_li">*/}
                            {/*    <Link to="/allchat" className="menu_allchat">AllChat</Link>*/}
                            {/*</li>*/}
                            <li className="menu_li" >
                                <Link onClick={() => logoutUser()} to="/login" className="menu_logout">Logout</Link>
                            </li>
                    </>)}
                    {!user && (<>
                            <li className="menu_li" ><Link to="/login" className="menu_log">Login</Link></li>
                            <li className="menu_li" ><Link to="/register" className="menu_reg">Register</Link></li>
                        </>)}
                </ul>
            </header>
        </>
    );
}

export default Header;
