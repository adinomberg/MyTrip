import React from 'react';
import './SignInUp.css';
import {auth} from "../../../server/firebase";
import {Link} from "react-router-dom";

const UserProfileContainer = ({user}) => {
    const { photoURL, displayName, email } = user;

    return (
        <div className="user-profile-cont">
            <div className="user-profile-title">
                <h1>My Profile</h1>
            </div>
            <div className="user-profile-data">
                <div className="user-picrute-container">
                    <img className="profile-picture" alt="user-profile"
                         src={photoURL || 'https://firebasestorage.googleapis.com/v0/b/equiomentlist.appspot.com/o/images%2Fprofile-pictures%2Fblank-profile-picture.png?alt=media&token=fd112c3c-e460-4e37-997b-36a914682bf9'} />
                </div>
                <div className="user-details-metadata">
                    <h2 className="">{displayName}</h2>
                    <h3 className="">{email}</h3>
                </div>
            </div>
            <button className="signout-button" onClick={() => { auth.signOut(); }}>Sign out <i className="fa fa-sign-out"></i></button>
            <div className="login-goto-yourtrip">
                Go to your trip <Link className="here-link" to="/mytrip">HERE</Link>.
            </div>
        </div>
    );
};

export default UserProfileContainer;