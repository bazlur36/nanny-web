import React from 'react';
import logo from './../logo.svg';
import { BrowserRouter, Route } from 'react-router-dom'

class Blogs extends React.Component {
    constructor(props) {
        super(props);
        //console.log(this.props.user)
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };

    }


    componentDidMount() {
        //fetch("https://jsonplaceholder.typicode.com/todos")
        fetch("http://localhost:3000/posts.json")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },

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
                <ul>
                    {items.map(item => (
                        <li onClick={this.blogDetail} key={item.title}>
                            {item.title} {item.title}
                        </li>
                    ))}
                </ul>
            );
        }
    }

    blogDetail = () => {
        alert("ddddd")
    }
}
export default Blogs;
