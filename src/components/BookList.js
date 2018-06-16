import React from 'react'
import axios from "axios/index";
import Books from "../components/books"

class BookList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            booksArray: [],
            command: props.command
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

    componentWillReceiveProps(nextProps, prevProps) {
        this.sayAllBooks(nextProps.command)
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
    };

    sayAllBooks = (com) => {
        if(com === "назвать все книги") {
            let booksArr = this.state.booksArray
            let text = null
            let i = 0;
            booksArr.forEach((item) =>  {
                i += 1;
                text = 'книга номер ' + i + ' - ' + item.title
                let speech = new SpeechSynthesisUtterance();
                speech.text = text;
                speechSynthesis.speak(speech);
            });

        }
    }


    render() {
        return (
            <div className="book" onClick={this.update}>
                <p className='title'>Books</p>
                {
                    this.state.booksArray.map((card) => {
                        return <Books data={card} command={this.props.command}/>
                    })
                }
            </div>
        )
    }
}

export default BookList;