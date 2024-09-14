import './AuthContainer.css';
import LogoIcon from '../../assets/icons/logo.svg?react';
import IllustrationIcon from '../../assets/icons/illustration.svg?react';

const AuthContainer = ({ children }) => {

    return (
        <div className="auth-container">
            <div className="container" id="container-1">
                <div className="logo">
                    <LogoIcon className="logo-icon" />
                    <div className="logo-text">Pondus</div>
                </div>
                {children}
            </div>
            <div className="container" id="container-2">
                <IllustrationIcon />
            </div>
        </div>
    );
};

export default AuthContainer;
