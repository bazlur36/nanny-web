import React from 'react';
import logo from './../logo.svg';
import { BrowserRouter, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';

class JobDetails extends React.Component {
    constructor(props) {
        super(props);
        //console.log(this.props.user)
        this.state = {
            error: null,
            isLoaded: false,
            job: null,
            applications: []
        };

    }


    componentDidMount() {
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
                        job: result.job
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
                <div className="row">
                    <div className="col-lg-12">
                        <h3>{this.state.job.title}</h3>
                        <p>{this.state.job.description}</p>
                        <Link to={`/jobs/${this.state.job.id}/applications`}>View Applications</Link>
                    </div>
                </div>
            );
        }
    }

    blogDetail = () => {
        alert("ddddd")
    }
}
export default JobDetails;
