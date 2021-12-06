
import EmailPage from "./EmailPage";
import ChangePassword from "./PasswordChange";
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function RoutesPage() {
    return (
        <BrowserRouter>
        <Routes>     
                <Route exact path="/chng_pwd/:token" element={<ChangePassword />}></Route>
                <Route exact path="/" element={<EmailPage/>} ></Route>
        </Routes>    
        </BrowserRouter>
    )
}


export default RoutesPage;