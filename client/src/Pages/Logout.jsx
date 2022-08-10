import {useNavigate} from 'react-router'

const Logout = () => {
    const navigate = useNavigate();
    localStorage.removeItem("userInfo");
    navigate("/");
}

export default Logout