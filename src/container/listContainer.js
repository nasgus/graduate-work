import React from 'react'
import CardList from "../components/list";

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
};
recognition.onerror = function (event) {
    recognizing = true;
};





class ListContainer extends React.Component {
    constructor() {
        super();


        this.state = {
            result: ''
        };

        this.startRec = this.startRec.bind(this)
    }

    startRec(e) {
        if (recognizing) {
            console.log(recognizing)
            if (e.code === 'ControlLeft' && e.repeat === false) {
                recognition.stop();
                recognition.start()
            }
        }

    }

    componentDidMount() {
        document.onkeydown = this.startRec

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
                <CardList command={this.state.result}/>
            </div>
        )
    }

};

export default ListContainer;