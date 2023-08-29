import {useLocation, useNavigate} from 'react-router-dom';

function FloaterLogic() {
    const location = useLocation();
    const navigate = useNavigate();
    const handleClick = () => {
        if (location.pathname === '/') {
            window.scrollTo({top: 0, behavior: 'smooth'});
        } else {
            navigate('/');
        }
    };
    return {
        handleClick,
    };
}

export default FloaterLogic;
