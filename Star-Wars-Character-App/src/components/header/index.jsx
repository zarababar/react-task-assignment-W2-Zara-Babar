// import { Link, useNavigate } from 'react-router-dom';
// import '../logout/Logout.css';

// const Header = ({ username }) => {
//     const navigate = useNavigate();
//     function handleLogout() {
//         navigate('/logout');
//     }
//     return (
//         <>
//             <div id='header'>
//                 <h1>Welcome {username} to the Star Wars App</h1>
//             </div>
//             <nav >
//                 {/* <Link to="/logout">Logout</Link> Link to the Logout route */}
//                 <button onClick={handleLogout} className="logout-button">Logout</button>
//             </nav>
//         </>

//     );
// };
// export default Header;
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../logout/Logout.css';

const Header = ({ uname }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }, []);
    function handleLogout() {
        navigate('/logout');
    }

    return (
        <div id="header">
            <h1>Welcome {username} to the Star Wars App</h1>
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
    );
};

export default Header;
