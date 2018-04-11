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
            open: false,
            desc: props.desc
        }
        }

    handleClickOpen = () => {
        this.setState({ open: !this.state.open });
    };

    render() {
        const {data} = this.props;
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