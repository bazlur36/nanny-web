import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import Blogs from './components/Blogs.jsx';
import Jobs from './components/Jobs.jsx';
import Login from './components/Login.jsx';
import JobApplications from './components/Detail.jsx';
import JobDetails from './components/JobDetails.jsx';
import JobCreate from './components/job/Create.jsx';
import JobEdit from './components/job/Edit.jsx';
import PrivateRoute from './components/PrivateRoute'
import {HashRouter as Router, Switch, Route, Link} from "react-router-dom";

class App extends React.Component {

    constructor(props) {
        super(props);
        //console.log(this.props.user)
        this.state = {
            error: null,
            isLoaded: true,
            isLoading: true,
            isLoggedIn: false,
            email: '',
            user_name: '',
            password: '',
            warning_message: false,
            items: []
        };

    }

    componentDidMount() {
        let auth_token = localStorage.getItem('authentication_token')
        let user_name = localStorage.getItem('user_name')
        console.log(auth_token)
        console.log("======================================")
        if (auth_token == null) {
            this.setState({isLoggedIn: false})
        }
        else {
            this.setState({isLoggedIn: true})
            this.setState({user_name: user_name})
        }

    }

    makeLogOut() {
        this.setState({isLoggedIn: false})
        localStorage.clear();
        window.location = '/'
    }

    render() {
        let {isLoggedIn} = this.state;
        console.log(isLoggedIn)
        const LoggedInMenu = () => {
            if (isLoggedIn) {
                return (
                    <li className="nav-item">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/jobs">Jobs</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="" onClick={() => this.makeLogOut()}>Logout</Link>
                            </li>
                        </ul>
                    </li>

                )
            } else {
                return (<li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                )
            }
        }

        return (
            <Router>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/blogs">Blogs</Link>
                            </li>
                            {LoggedInMenu()}
                        </ul>

                    </div>
                </nav>
                <main role="main" className="container" style={{marginTop: "100px"}}>
                    <Switch>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route exact path="/jobs">
                            <Jobs />
                        </Route>
                        <Route exact path="/jobs/:id" component={JobDetails}/>
                        <Route exact path="/jobs/edit/:id" component={JobEdit}/>
                        <PrivateRoute exact path="/job/create" component={JobCreate}/>
                        <Route path="/blogs">
                            <Blogs user={"bazlur"}/>
                        </Route>
                        <Route exact path="/jobs/:id/applications" component={JobApplications} />
                        <Route path="/">
                            <Home />
                        </Route>

                    </Switch>

                </main>
                <div>
                </div>
                <footer className="footer mt-auto py-3">
                    <div className="container">
                        <span className="text-muted">Place sticky footer content here.</span>
                    </div>
                </footer>
            </Router>

        );
    }
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

export default App;