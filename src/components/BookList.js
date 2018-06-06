import React from 'react'
import axios from "axios/index";
import Books from "../components/books"

let c = 10


class BookList extends React.Component {
    constructor() {
        super()
        this.state = {
            booksArray: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/books')
            .then((res) => {
                this.setState({
                    booksArray: res.data
                })
            })
            .catch((err) => {
                console.log('bad response', err)
            })
    }

    update = (e) => {
        if (e.target.className === 'delete-btn') {
            axios.get('http://localhost:8000/books')
                .then((res) => {
                    this.setState({
                        booksArray: res.data
                    })
                })
                .catch((err) => {
                    console.log('bad response', err)
                })
            console.log(this.state.booksArray)
            this.componentDidMount()

        }

    }


    render() {
        return (
            <div className="list" onClick={this.update}>
                <p className='title'>Books</p>
                {
                    this.state.booksArray.map((card) => {
                        return <Books data={card} key={c++} command={this.props.command}/>
                    })
                }
            </div>
        )
    }
}

export default BookList;