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
        speech.text = 'название книги - ' + this.props.data.title;
        if(this.state.open === false) {
            speechSynthesis.speak(speech);

        } else {
            speechSynthesis.cancel()
        }
    };

    openCard = () => {
        let com = 'открыть книгу'
        let prop = this.props.command.slice(15)
        if(this.props.command.indexOf(com) === 0 && prop === this.state.title) {
            this.setState({ open: !this.state.open });
            this.startSPeak()
        }
    }
    render() {
        const {data} = this.props;
        console.log(data, 'kek')
        return(
            <div onClick={this.handleClickOpen} className='card' id={data.id}>
                {data.title}
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