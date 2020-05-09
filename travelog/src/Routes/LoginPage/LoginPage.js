/*eslint semi: ["error", "always"]*/

import React, { Component } from 'react';
import LoginForm from '../../Components/LoginForm/LoginForm';
import './LoginPage.css';

export default class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {}
        }
    }

    handleLoginSuccess = () => {
        const { location, history } = this.props;
        const destination = (location.state || {}).from || '/';
        history.push(destination);
    }

    render() {
        return (
            <>
                <section>
                    <h2>Login</h2>
                    <LoginForm 
                        onLoginSuccess={this.handleLoginSuccess}
                    />
                </section>
            </>
        );
    }
}