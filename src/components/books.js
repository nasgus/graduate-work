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
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            title: props.data.title.toLowerCase()
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
        console.log(this.state.title)
        let speech = new SpeechSynthesisUtterance();
        speech.text = this.props.data.title + '. ' + this.props.data.desc;
        if(this.state.open === false) {
            speechSynthesis.speak(speech);

        } else {
            speechSynthesis.cancel()
        }
    };

    componentWillMount() {
        this.openCard()
    }

    componentWillReceiveProps(nextProps, lol) {
        this.setState({
            command: nextProps.command
        });

        this.openCard(nextProps.command)
    }

    openCard(command) {
        let open = 'открыть книгу'
        let close = 'закрыть книгу'
        let prop

        if(command !== undefined) {
            prop = command.slice(14);

            if(command.indexOf(open) === 0 && prop === this.state.title) {
                this.setState({ open: !this.state.open });
                this.startSPeak()
            }
            if(command === close) {
                this.setState({
                    open: false
                })
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
            <div className='card'>
                <button className='delete-btn' onClick={this.delete}>X</button>

                <div onClick={this.handleClickOpen} id={data.id}>
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