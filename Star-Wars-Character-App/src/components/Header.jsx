import { Link } from 'react-router-dom';

const Header = ({ username }) => {
    return (
        <div id='header'>
            <h1>Welcome {username} to the Star Wars App</h1>
            <nav>
                <Link to="/logout">Logout</Link> {/* Link to the Logout route */}
            </nav>
        </div>
    );
};
export default Header;