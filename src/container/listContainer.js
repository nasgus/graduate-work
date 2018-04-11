import React from 'react'
import CardList from "../components/list";




class ListContainer extends React.Component {
    constructor() {
        super();

        const SpeechRecognition = window.SpeechRecognition
            || window.webkitSpeechRecognition
            || window.mozSpeechRecognition
            || window.msSpeechRecognition
            || window.oSpeechRecognition

        this.recognition = new SpeechRecognition()

        this.state = {
            result: ''
        };

        this.startRec = this.startRec.bind(this)
    }

    startRec(e) {
        if (e.code === 'Space' && e.repeat === false) {
            this.recognition.start()
        }
    }

    componentDidMount() {
        document.onkeydown = this.startRec

        this.recognition.onresult = function (event) {
            console.log(event.results[0][0].transcript);
            this.setState({
                result: event.results[0][0].transcript.toLowerCase()
            })
        }.bind(this)


    }


    render() {
        return (
            <div>

                <button className='start' onClick={this.startRec}>sd</button>
                <div className='check-word'>{this.state.result}</div>
                <CardList command={this.state.result}/>
            </div>
        )
    }

};

export default ListContainer;