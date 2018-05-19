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

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            delete: true,
            open: false,
            desc: props.desc,
            title: props.data.title,
            speechSyn: new SpeechSynthesisUtterance,
    }
        }

    handleClickOpen = () => {
        this.setState({ open: !this.state.open });
        this.startSPeak()
    };

    startSPeak = () => {
        let speech = new SpeechSynthesisUtterance();
        speech.text = 'название заметки - ' + this.props.data.title + '. описание заметки - ' + this.props.data.desc;
        if(this.state.open === false) {
            speechSynthesis.speak(speech);

        }
    }

    componentWillMount() {
        this.openCard()
        this.deleteCard()
    }

    openCard() {
        let com = 'открыть заметку'
        let prop = this.props.command.slice(16)
        if(this.props.command.indexOf(com) === 0 && prop === this.state.title) {
            this.setState({ open: !this.state.open });
        }
    }

    deleteCard() {
        //
        // let com = 'удалить заметку';
        // let prop = this.props.command.slice(16);
        // if(this.props.command.indexOf(com) === 0 && prop === this.state.title) {
        //     this.setState({ delete: !this.state.delete})
        // }

    }


    render() {
        const {data} = this.props;

        if(!this.state.delete) {
            return(null)
        }
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

export default Card;