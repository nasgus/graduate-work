import React from 'react'
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import axios from "axios/index";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            delete: true,
            open: false,
            desc: props.desc,
            title: props.data.title,
            speechSyn: new SpeechSynthesisUtterance(),
            command: null
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
        speech.text = 'название заметки - ' + this.props.data.title + '. описание заметки - ' + this.props.data.desc;
        if(this.state.open === false) {
            speechSynthesis.speak(speech);

        } else {
            speechSynthesis.cancel()
        }
    };
    componentWillMount() {
        this.openCard()
        console.log('open1', this.state.title)

    }

    componentWillReceiveProps(nextProps, lol) {
        this.setState({
            command: nextProps.command
        });

        this.openCard(nextProps.command)
    }

    openCard(command) {
        let open = 'открыть заметку'
        let cancel = 'закрыть заметку'

        let prop

        if(command !== undefined) {
            prop = command.slice(16);
            if(command.indexOf(open) === 0 && prop === this.state.title) {
                this.setState({ open: !this.state.open });
                this.startSPeak()
            }
            if(command === cancel) {
                this.setState({
                    open: false
                })
            }
        }
    }

    delete = () => {
        let id = this.props.data._id
        axios.delete("http://localhost:8000/cards/" + id)
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

export default Card;