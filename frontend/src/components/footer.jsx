import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-[#242526] text-white py-4 flex flex-col items-center justify-center w-full">
            <div className="flex space-x-4">
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="text-2xl">
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noreferrer" className="text-2xl">
                    <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="text-2xl">
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="text-2xl">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
            </div>
            <p>© 2021 All rights reserved.</p>
        </footer>
    );
}

export default Footer;