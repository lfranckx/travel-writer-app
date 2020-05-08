/*eslint semi: ["error", "always"]*/
import React, { Component } from 'react';
import './Header.css';
// import { Link } from 'react-router-dom';
import TokenService from '../../Services/token-service';
import IdleService from '../../Services/idle-service';

export default class Header extends Component {
    handleLogOut = () => {
        TokenService.clearAuthToken();
        /* when logging out, clear the callbacks to the refresh api and idle auto logout */
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
    }

    renderLogOut() {
        return (
            <>
                <header>
                    <div className="header-container">
                        <h1>Travelog</h1>
                    </div>
                    <div className="header-container">
                        <label className="hidden">search</label>
                        <input type="text" />                    </div>
                </header>
            </>
        );
    }
}