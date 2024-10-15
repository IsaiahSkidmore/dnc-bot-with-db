import { Link } from 'react-router-dom';
import Login from '../pages/Login';

const LandingPage = () => {
    return (
        <div>
            
            <h1 style={{marginTop: '80px'}}>Welcome to the DNC Bot</h1>
            
                <Login />
        </div>
    );
}

export default LandingPage;