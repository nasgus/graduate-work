import React from 'react'
import CardList from "../components/list";
import BookList from "../components/BookList"

const SpeechRecognition = window.SpeechRecognition
    || window.webkitSpeechRecognition
    || window.mozSpeechRecognition
    || window.msSpeechRecognition
    || window.oSpeechRecognition

let recognition = new SpeechRecognition();
recognition.interimResults = false;
let recognizing = true;

recognition.onstart = function () {
    recognizing = false;
};
recognition.onend = function () {
    recognizing = true;
    startRec()
};
recognition.onerror = function () {
    recognizing = true;
};

function startRec(e) {
    if (recognizing) {
        recognition.stop();
        recognition.start();
        }
}


class ListContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            result: ''
        };

    }

    componentDidMount() {
        window.onload = startRec()
        recognition.onresult = function (event) {
            this.setState({
                result: event.results[0][0].transcript.toLowerCase()
            })
        }.bind(this)


    }

    render() {
        return (
            <div>
                <div className='check-word'>{this.state.result}</div>
                <BookList/>
                <CardList command={this.state.result}/>
            </div>
        )
    }

};

export default ListContainer;