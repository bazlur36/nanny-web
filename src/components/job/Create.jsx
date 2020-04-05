import React from 'react';
import logo from './../../logo.svg';
import { BrowserRouter, Route } from 'react-router-dom'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

class JobCreate extends React.Component {
    constructor(props) {
        super(props);
        console.log('=========JOB Create==========')
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

    }

    render() {

            return (
                <h1>Create Job</h1>
            );

    }

}
export default JobCreate;
