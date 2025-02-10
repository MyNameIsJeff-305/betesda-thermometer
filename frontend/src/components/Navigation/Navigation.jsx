import NavLogo from "./NavLogo/NavLogo";
import ProfileButton from "./ProfileButton";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import * as sessionActions from '../../store/session';

import "./Navigation.css"
import { useEffect } from "react";

const Navigation = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(sessionActions.restoreUser());
    }, [dispatch]);

    return (
            <div className="navigation-container">
                <div className="nav-left-container">
                    <NavLogo />
                </div>
                <div className="nav-right-container">
                    <ProfileButton user={user}/>
                </div>
            </div>
    )
}

export default Navigation;