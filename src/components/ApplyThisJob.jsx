import React from 'react';
import logo from './../logo.svg';
import { BrowserRouter, Route } from 'react-router-dom'
import { Redirect } from 'react-router';

import { Link } from 'react-router-dom';

class ApplyThisJob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            bid_amount: 0,
            job: this.props.job,
            job_application: {},
            applications: this.props.applications
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        console.log("######################")
        console.log(this.state.applications)
        console.log("######################")
    }

    handleChange(event) {
        this.setState({bid_amount: event.target.value});
    }


    handleSubmit(event) {

        let job_application = this.state.job_application;
        job_application.job_id = this.state.job.id
        job_application.bid_amount = this.state.bid_amount;

        alert('A name was submitted: ' + this.state.amount);
        event.preventDefault();

        try {
            let response = fetch(`http://localhost:3000/api/job_applications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'enableEmptySections':true,
                    'Authorization': 'Token token=' + localStorage.getItem('authentication_token')
                },
                body: JSON.stringify(job_application),
            });
            let responseJson = response.json();
            if (response.ok) {
                this.setState({ isLoading: false, warning_message: false }, () => {

                });

            } else {
                this.setState({ isLoaded: false });
            }
        } catch (error) {
            console.log(error)
            /*this.setState({ isLoading: false });*/
            alert('Something went wrong, please try again.');
        }



    }


    render() {
        const { error, isLoaded, items } = this.state;

        return (
            <div className="job-applications">
                <h1>Apply for this Job</h1>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" value={this.state.bid_amount} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>

        );

    }

}
export default ApplyThisJob;
