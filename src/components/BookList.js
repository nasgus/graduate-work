import React from 'react'
import axios from "axios/index";
import Books from "../components/books"

let bookArray = [];
let c = 10


class BookList extends React.Component {
    constructor() {
        super()
        this.state = {
            booksArray: []
        }
    }

    handleClickOpen = () => {
        if(this.state.open === false) {
            speechSynthesis.cancel()

        }
        this.setState({ open: !this.state.open });
        this.startSPeak()
    };

    startSPeak = () => {
        let speech = new SpeechSynthesisUtterance();
        speech.text = 'название книги - ' + this.props.data.title;
        if(this.state.open === false) {
            speechSynthesis.speak(speech);

        } else {
            speechSynthesis.cancel()
        }
    };

    componentDidMount() {
        axios.get('http://localhost:8000/cards')
            .then((res) => {
                console.log(res)
                this.setState({
                    booksArray: res.data
                })
            })
            .catch((err) => {
                console.log('bad response', err)
            })
        // console.log(booksArray)

    }

    componentWillMount() {
        this.openCard()
    }
    openCard = () =>{
        // let com = 'открыть книгу'
        // let prop = this.props.command.slice(15)
        // if(this.props.command.indexOf(com) === 0 && prop === this.state.title) {
        //     this.setState({ open: !this.state.open });
        //     this.startSPeak()
        // }
    }
    render() {
        return(
            <div className="list">
                <p className='title'>Books</p>
                {
                    this.state.booksArray.map((card) => {
                        return <Books data={card} key={c++} command={this.props.command} />
                    })
                }
            </div>
        )
}
}

export default BookList;