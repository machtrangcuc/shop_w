import { NavLink, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
    const isLoggedIn = localStorage.getItem('isLogin') === 'true';
    const userId = localStorage.getItem('userId');

    const [navItems, setNavItems] = useState([
        { name: "Home", link: "/" },
        { name: "Laptop", link: "/laptop" },
        { name: "Phone", link: "/phone" },
        { name: "Other", link: "/other" },
        { name: "Cart", link: "/cart" },
    ]);

    const navigate = useNavigate();
    const handleLogOut = useCallback(() => {
        localStorage.setItem('isLogin', false);
        localStorage.setItem('userId', "");
        localStorage.setItem('isAdmin', false);
        navigate('/');
    }, []);

    return (
        <nav className="z-10 fixed right-0 left-0 top-0 bg-[#242526] text-white h-16 flex items-center justify-between px-10">
            <NavLink to="/" className="font-semibold text-2xl hover:opacity-80">Friendly Shoppee</NavLink>
            <div className="h-full flex items-center">
                {
                    navItems.map((item, index) => (
                        <NavLink key={index} to={item.link} activeClassName="text-[#22c55e]" className="px-4 hover:opacity-60">{item.name}</NavLink>
                    ))
                }
                {
                    isLoggedIn ? 
                    <>
                        <NavLink to="/profile" className="ml-14 px-4 hover:opacity-60">
                            <FontAwesomeIcon icon={faUser} /> Profile
                        </NavLink>
                        <NavLink onClick={handleLogOut} to="/" className="px-4 hover:opacity-60">
                            <FontAwesomeIcon icon={faSignOutAlt} /> Log out
                        </NavLink>
                    </> : 
                    <>
                        <NavLink to="/logIn" className="ml-14 px-4 hover:opacity-60">
                            <FontAwesomeIcon icon={faSignInAlt} /> Log in
                        </NavLink>
                        <NavLink to="/signUp" className="px-4 hover:opacity-60">
                            <FontAwesomeIcon icon={faUserPlus} /> Sign up
                        </NavLink>
                    </>
                }
            </div>
        </nav>
    );
}

export default NavBar;