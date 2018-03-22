import React, {Component} from 'react';
import ListContainer from './container/listContainer'

class App extends Component {
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

    startRec() {
        this.recognition.start()
    }

    componentDidMount() {
        this.recognition.onresult = function (event) {
            console.log(event.results[0][0].transcript);
            this.setState({
                result: event.results[0][0].transcript
            })
        }.bind(this)

    }


    render() {
        return (
            <div className="App">
                <button className='start' onClick={this.startRec}>sd</button>
                <div>{this.state.result}</div>
                <ListContainer/>
            </div>
        );
    }
}

export default App;
