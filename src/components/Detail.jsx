import React from 'react';
import logo from './../logo.svg';
import { BrowserRouter, Route } from 'react-router-dom'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import ApplyThisJob from './ApplyThisJob.jsx';

class JobApplications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            job: {title:"singleee"},
            job_applications: [],
            items:[]
        };

    }


    componentDidMount() {
        let auth_token = localStorage.getItem('authentication_token')
        //let jobId = this.props.match.params.id
        let jobId = this.props.match.params.id

        fetch(`http://localhost:3000/api/job_applications?job_id=${jobId}`,{
            headers: {
                'Content-Type': 'application/json',
                'enableEmptySections':true,
                'Authorization': 'Token token=' + auth_token
            }})
            .then(res => res.json())
            .then(
                (result) => {
                    //console.log(result)
                    this.setState({
                        isLoaded: true,
                        items: result.job_applications,
                        job: result.job_applications[0].job
                    },alert(this.state.job.title));
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
        const { error, isLoaded, items, job } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="job-applications">
                    <h1>JobApplications for {job.title}</h1>
                    <ul>
                        {this.state.items.map(item => (
                            <li>
                                {item.user.name}
                            </li>
                        ))}
                    </ul>
                    {this.state.job.applied ? (
                        <h1>You have already applied this job</h1>
                    ) : (
                        <ApplyThisJob applications={items} job={job}  />
                    )}
                </div>

            );
        }
    }

}
export default JobApplications;
