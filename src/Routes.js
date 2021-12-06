
import EmailPage from "./EmailPage";
import ChangePassword from "./PasswordChange";
import { Route, Routes, HashRouter } from 'react-router-dom';

function RoutesPage() {
    return (
        <HashRouter>
        <Routes>     
                <Route exact path="/chng_pwd/:token" element={<ChangePassword />}></Route>
                <Route exact path="/" element={<EmailPage/>} ></Route>
        </Routes>    
        </HashRouter>
    )
}


export default RoutesPage;