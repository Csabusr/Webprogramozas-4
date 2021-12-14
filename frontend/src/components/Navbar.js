import React from "react";
import {NavLink} from "react-router-dom";

const Navbar = () => {
    const activeClass = 'active';
    const normalClass = 'nav-link';

    return (
        <nav className='nav justify-content-center'>
            <NavLink to='/neptuns' className={isActive => isActive ? `${normalClass} ${activeClass}` : normalClass}>
                Neptunok
            </NavLink>
            <NavLink to='/students' className={isActive => isActive ? `${normalClass} ${activeClass}` : normalClass}>
                Studentek
            </NavLink>
            <NavLink to='/addresses' className={isActive => isActive ? `${normalClass} ${activeClass}` : normalClass}>
                Addressek
            </NavLink>
        </nav>
    );
}

export default Navbar;