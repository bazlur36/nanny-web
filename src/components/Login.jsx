import React from 'react';
import logo from './../logo.svg';
import { BrowserRouter, Route } from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props);
        //console.log(this.props.user)
        this.state = {
            error: null,
            isLoaded: true,
            isLoading: true,
            email: '',
            password: '',
            warning_message: false,
            items: []
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

    }


    componentDidMount() {
        //fetch("https://jsonplaceholder.typicode.com/todos")
    }

    async makeLogin() {
        try {
            let response = await fetch(`http://localhost:3000/api/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password
                    }
                ),
            });
            let responseJson = await response.json();
            if (response.ok) {
                this.setState({ isLoading: false, warning_message: false }, () => {
                    
                    localStorage.setItem('authentication_token', responseJson.user.auth_token);
                    localStorage.setItem('user_name', `${responseJson.name}`);
                    if (responseJson.role == 'nanny') {
                        alert("nanny")

                    } else if (responseJson.role == 'parent') {
                        alert("parent")
                    }
                    window.location = '/'
                });

            } else {
                this.setState({ isLoading: false, warning_message: true });
            }
        } catch (error) {
            console.log(error)
            /*this.setState({ isLoading: false });*/
            alert('Something went wrong, please try again.');
        }
    }

    handleEmailChange (event) {
        this.setState({email: event.target.value});
    }
    handlePasswordChange (event) {
        this.setState({password: event.target.value});
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div class="container">
                    <label for="uname"><b>Username</b></label>
                    <input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="Enter Username" required />

                    <label for="psw"><b>Password</b></label>
                    <input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Enter Password" required />

                    <button type="submit" onClick={() => this.makeLogin()}>Login</button>
                    <label>
                        <input type="checkbox" checked="checked" name="remember" /> Remember me
                    </label>
                </div>
            );
        }
    }

    blogDetail = () => {
        alert("ddddd")
    }
}
export default Login;
