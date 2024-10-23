import {Routes, Route, Navigate } from 'react-router-dom';
import Chat from "./pages/Chat.jsx"
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import AllChat from "./pages/AllChat.jsx";
import Header from "./components/Header.jsx";
// import 'bootstrap/dist/css/bootstrap-grid.min.css'
import {AuthContext} from "./context/AuthContext.jsx";
import {useContext} from "react";
import {ChatContextProvider} from "./context/ChatContext";

function App() {
    const {user} =  useContext(AuthContext);

    return (
        <ChatContextProvider user={user}>
            <Header/>
            <div className='header_pillow'></div>
            <Routes>
                <Route path="/" element={user ? <Chat/> : <Login/>}/>
                <Route path="/register" element={user ? <Chat/> :<Register/>}/>
                <Route path="/login" element={user ? <Chat/> : <Login/>}/>
                <Route path="/allchat" element={user ? <AllChat/> : <Login/>}/>
                <Route path="*" element={<Navigate to ="/"/>}/>
            </Routes>
        </ChatContextProvider>
    );
}

export default App;
