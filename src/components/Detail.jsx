import React from 'react';
import logo from './../logo.svg';
import { BrowserRouter, Route } from 'react-router-dom'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        console.log('===================')
        console.log(this.props.match.params.id)
        console.log('++++++++++++++++++++')
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };

    }


    componentDidMount() {
        //fetch("https://jsonplaceholder.typicode.com/todos")
        let auth_token = localStorage.getItem('authentication_token')
        fetch("http://localhost:3000/api/job/all_openings",{
            headers: {
                'Content-Type': 'application/json',
                'enableEmptySections':true,
                'Authorization': 'Token token=' + auth_token
            }})
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
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <h1>dfddfd</h1>
            );
        }
    }

}
export default Detail;
