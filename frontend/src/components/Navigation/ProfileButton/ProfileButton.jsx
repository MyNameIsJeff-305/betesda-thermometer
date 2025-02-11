import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../store/session';
import OpenModalMenuItem from '../OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';

import { MdLogout } from "react-icons/md";

import './ProfileButton.css'
import { useNavigate } from 'react-router-dom';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        navigate('/');
    };

    return (
        <div className='profile-button-container'>
            {user ? (
                <>
                    <div className='regular-profile'>
                        <p>Hello, {user.firstName}</p>
                        <div>
                            <button className='logout-button' onClick={logout}>Logout</button>
                        </div>
                    </div>
                    <div className='mobile-profile'>
                        <div className='logout-button' onClick={logout}><MdLogout /></div>
                    </div>
                </>
            ) : (
                <button className='login-button'>
                    <OpenModalMenuItem
                        itemText="Log In"
                        onItemClick={closeMenu}
                        modalComponent={<LoginFormModal />}
                    />
                </button>
            )}
        </div>
    );
}

export default ProfileButton;