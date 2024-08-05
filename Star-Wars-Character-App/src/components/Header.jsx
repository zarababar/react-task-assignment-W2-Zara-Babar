import appLogo from '../assets/app-logo-background.png'
const Header = () => {
    return (

        <div id='header'>
            <h1>Star Wars App</h1>
            <img src={appLogo} alt="Star Wars Logo"></img>
        </div>
    );
};
export default Header;