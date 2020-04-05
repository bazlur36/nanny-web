import React from 'react';
import logo from './../logo.svg';
import { BrowserRouter, Route } from 'react-router-dom'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class Jobs extends React.Component {
    constructor(props) {
        super(props);
        alert("constructor")
        this.state = {
            error: null,
            isLoaded: false,
            authorized: false,
            items: []
        };

    }


    componentWillMount() {
        alert("CWM")
        let auth_token = localStorage.getItem('authentication_token')
        if (auth_token === null) {
            this.setState({
                authorized: false,
            });
        }
        else {
            this.setState({
                authorized: true,
            });
        }
    }

    componentDidMount() {
        alert("CDM")
        //fetch("https://jsonplaceholder.typicode.com/todos")
        let auth_token = localStorage.getItem('authentication_token')

            fetch("http://localhost:3000/api/job/all_openings", {
                headers: {
                    'Content-Type': 'application/json',
                    'enableEmptySections': true,
                    'Authorization': 'Token token=' + auth_token
                }
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result)
                        this.setState({
                            isLoaded: true,
                            items: result.jobs
                        });
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            authorized: true,
                            error
                        });
                    }
                )

    }

    render() {
        alert("Render"+this.state.authorized)
        if(!this.state.authorized) {
            //alert(this.state.authorized)
            return <Redirect to='/login' />
        }
        else {
            //alert(this.state.authorized)
            const {error, isLoaded, items} = this.state;
            if (error) {
                return <div>Error: {error.message}</div>;
            } else if (!isLoaded) {
                return <div>Loading...</div>;
            } else {
                return (
                    <ul>
                        {items.map(item => (
                            <li>
                                <Link to={`/jobs/${item.id}`}>{item.title}</Link>

                            </li>
                        ))}
                    </ul>
                );
            }
        }
    }
}
export default Jobs;
