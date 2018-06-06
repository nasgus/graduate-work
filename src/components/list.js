import React from 'react'
import Card from "./card";
import axios from "axios"

let b = 0;

class CardList extends React.Component {
    constructor(props) {
        super();
        this.state = {
            cardsArray: [],
            isAddBlockOpened: false,
            title: '',
            desc: '',
            command: props.command,
            speechSyn: new SpeechSynthesisUtterance(),

        };
        this.toggleAddCard = this.toggleAddCard.bind(this);
        this.addToList = this.addToList.bind(this);
        this.changeTitle = this.changeTitle.bind(this)
        this.changeDesc = this.changeDesc.bind(this)
        this.checkArrCommand = this.checkArrCommand.bind(this)
        this.deleteCard = this.deleteCard.bind(this)
    }

    toggleAddCard() {
        this.setState({
            title: '',
            desc: '',
            isAddBlockOpened: !this.state.isAddBlockOpened
        })
    }

    addToList() {
        let data = 'title=' + this.state.title + '&desc=' + this.state.desc
        console.log(this.state.title !== '', this.state.desc !== '', this.state.isAddBlockOpened)
        if (this.state.title !== '' && this.state.desc !== '') {
           axios.post("http://localhost:8000/cards", data)
               .then(function (response) {
                   console.log(response);
               })
               .catch(function (error) {
                   console.log(error);
               });
            this.toggleAddCard()
            this.update()
        }
    }

    changeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    changeDesc(e) {
        this.setState({
            desc: e.target.value
        })
    }

    speechCheck = (com) => {
        let speech = new SpeechSynthesisUtterance();
        speech.text = com;
        speechSynthesis.speak(speech);
        if (this.state.isAddBlockOpened && com !== 'отменить создание заметки') {
            let speech = new SpeechSynthesisUtterance();
            speech.text = 'Пожалуйста, заполните все поля';
            speechSynthesis.speak(speech);
        }

    }

    componentWillReceiveProps(nextProps, lol) {
        this.setState({
            command: nextProps.command > this.props.command
        });
        this.checkArrCommand(nextProps.command)
        this.deleteCard(nextProps.command)
        this.speechCheck(nextProps.command)
        console.log(nextProps.command)
    }

    componentDidMount() {
        axios.get('http://localhost:8000/cards')
            .then((res) => {
                this.setState({
                    cardsArray: res.data
                })
            })
            .catch((err) => {
                console.log('bad response', err)
            })
    }

    update = () => {
        axios.get('http://localhost:8000/cards')
            .then((res) => {
                this.setState({
                    cardsArray: res.data
                })
            })
            .catch((err) => {
                console.log('bad response', err)
            })
        this.componentDidMount()

    }

    checkArrCommand(command) {
        const addCommand = [
            'создать заметку',
            'создать новую заметку',
            'новая заметка',
            'сделай новую заметку',
            'напиши новую заметку',
            'добавить заметку',
            'добавить новую заметку'
        ];
        const saveCommand = [
            'сохранить заметку',
            'запомнить заметку',
            'сохрани заметку',
            'сберечь заметку',
        ];
        const cancelCommand = [
            'отменить создание заметки',
            'запретить создание заметку',
            'забыть создание заметку',
            'не сохронять заметку',
        ];
        const nameCommand = [
            'название заметки',
            'имя заметки',
            'титул заметки',
            'наименование заметки',
            'назвать заметку',

        ];
        const descCommand = [
            'описание заметки',
            'задание заметки',
        ];

        addCommand.forEach((item) => {
            if (command.indexOf(item) === 0) {
                this.toggleAddCard()
            }
        });
        saveCommand.forEach((item) => {
            if (command.indexOf(item) === 0) {
                this.addToList()
            }
        });
        cancelCommand.forEach((item) => {


            if (command.indexOf(item) === 0) {
                this.toggleAddCard()
            }
        });
        nameCommand.forEach((item) => {
            if (command.indexOf(item) === 0) {
                this.setState({
                    title: command.slice(item.length + 1)
                })
            }
        });
        descCommand.forEach((item) => {
            if (command.indexOf(item) === 0) {
                this.setState({
                    desc: command.slice(item.length + 1)
                })
            }
        });
    }

    deleteCard(kek) {
        let com = 'удалить заметку';
            this.state.cardsArray.map((card) => {
                if(kek.indexOf(com) === 0 && kek.slice(16) === card.title) {
                    console.log(card.title, card._id)
                    let id = card._id
                    axios.delete("http://localhost:8000/cards/" + id)
                    this.update()

                }
            })
    }


    render() {
        return (
            <div className="list" onClick={this.update}>
                <p className='title'>To Do</p>
                {
                    this.state.cardsArray.map((card) => {
                        return <Card data={card} command={this.props.command} />
                    })
                }
                {this.state.isAddBlockOpened ?
                    <div className="add-card-opened">
                        <textarea className='card-title' onChange={this.changeTitle} value={this.state.title}></textarea>
                        <textarea className='card-desc' onChange={this.changeDesc} value={this.state.desc}></textarea>
                        <button className='add-card-btn grey' onClick={this.addToList}>Добавить</button>
                        <button className='cancel-card grey' onClick={this.toggleAddCard}>Х</button>
                    </div> :
                    <p className="add-card grey" onClick={this.toggleAddCard}> Добавить карточку... </p>
                }

            </div>
        )
    }
}


export default CardList;