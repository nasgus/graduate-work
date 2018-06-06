import axios from "axios/index";
import React from 'react'
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}



class Books extends React.Component {
    constructor() {
        super()
        this.state = {
            open: false
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
        speech.text = this.props.data.title + '.' + this.props.data.desc;
        if(this.state.open === false) {
            speechSynthesis.speak(speech);

        } else {
            speechSynthesis.cancel()
        }
    };

    componentWillMount() {
        this.openCard()
    }

    openCard() {
        let com = 'открыть книгу'
        if(this.props.command !== undefined) {
            let prop = this.props.command.slice(15)
            if(this.props.command.indexOf(com) === 0 && prop === this.state.title) {
                this.setState({ open: !this.state.open });
                this.startSPeak()
            }
        }
    };


    delete = () => {
        let id = this.props.data._id
        axios.delete("http://localhost:8000/books/" + id)
    };


    render() {
        const {data} = this.props;
        return(
            <div>
                <button className='delete-btn' onClick={this.delete}>X</button>

                <div onClick={this.handleClickOpen} className='card' id={data.id}>
                    {data.title}
                </div>
                <Dialog
                    open={this.state.open}
                    transition={Transition}
                    keepMounted
                    onClose={this.handleClickOpen}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {data.title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {data.desc}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClickOpen} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default Books