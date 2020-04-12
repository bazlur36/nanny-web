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
            applied: false,
            job_applications: [],
            items:[]
        };
        /*alert("constructor")*/
        this.updateApplications = this.updateApplications.bind(this)
    }

    componentWillReceiveProps(){
       /* alert("componentWillReceiveProps")*/
    }

    componentWillMount() {
       /* alert("componentWillMount")*/
        let auth_token = localStorage.getItem('authentication_token')
        let jobId = this.props.match.params.id
        fetch(`http://localhost:3000/api/jobs/${jobId}`,{
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
                        job: result.job,
                        applied: result.job.applied
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

    componentDidMount() {
        let auth_token = localStorage.getItem('authentication_token')
        //let jobId = this.props.match.params.id
        let jobId = this.props.match.params.id;
       /* alert("componentDidMount")*/
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
                        items: result.job_applications
                    },/*alert(this.state.job.title)*/);
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

    updateApplications(job_application,a) {
        //let user = localStorage.getItem('user')
        let new_job_application = job_application
        //new_job_application.user.name = user.name
        let job_applications = this.state.items.concat(new_job_application)
        this.setState({
            applied: a,
            items: job_applications
        },console.log(job_applications))
    }

    render() {
        const { error, isLoaded, items, job } = this.state;
        //const applied = this.state.job.applied
        /*alert("isLoaded"+isLoaded)*/
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="job-applications">
                    <h3>Job Applications for {job.title}</h3>
                    <ul>Users applied for this job
                        {this.state.items.map(item => (
                            <li key={item.id} >
                                {item.user.first_name} {item.user.last_name} - {item.bid_amount}
                            </li>
                        ))}
                    </ul>
                    {this.state.applied ? (
                        <h4>You have already applied this job</h4>
                    ) : (
                        <ApplyThisJob updateApplications={this.updateApplications} applications={items} job={job}  />
                    )}
                </div>

            );
        }
    }

}
export default JobApplications;
