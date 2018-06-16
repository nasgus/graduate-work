import React from 'react'
import Card from "./card";
import axios from "axios"

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
        if (this.state.title !== '' && this.state.desc !== '') {
            this.checkTitles(this.state.title)
        } else {
            let speech = new SpeechSynthesisUtterance();
            speech.text = 'Пожалуйста, заполните все поля';
            speechSynthesis.speak(speech);
        }
    }

    checkTitles = (name) => {
        console.log(1)
        let num = 0
        if(this.state.cardsArray.length !== 0) {
            console.log(2)
            this.state.cardsArray.forEach((item) => {
                if(item.title === name) {
                    console.log(3)

                    num -= 1
                } else {
                    console.log(3)

                    num += 1
                }
            })
            this.checkName(num)

        } else {
            let data = 'title=' + this.state.title + '&desc=' + this.state.desc
            axios.post("http://localhost:8000/cards", data)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            this.toggleAddCard();
            this.update()
            let speech = new SpeechSynthesisUtterance();
            speech.text = 'заметка успешно сохранена';
            speechSynthesis.speak(speech);
        }

    }

    checkName = (num) => {
        console.log(4)

        if(num !== this.state.cardsArray.length) {
            console.log(5)

            let speech = new SpeechSynthesisUtterance();
            speech.text = 'Такое название уже существует, придумайте пожалуйста другое название';
            speechSynthesis.speak(speech);
        } else {
            console.log(5)

            let data = 'title=' + this.state.title + '&desc=' + this.state.desc
            axios.post("http://localhost:8000/cards", data)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            this.toggleAddCard();
            this.update()
            let speech = new SpeechSynthesisUtterance();
            speech.text = 'заметка успешно сохранена';
            speechSynthesis.speak(speech);
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
        let del = com.indexOf("удалить заметку") === 0
        console.log(com !== 'сохранить заметку' || com !== 'назвать все книги' || com !== 'назвать все заметки')
        if(com === 'сохранить заметку' || com === 'назвать все книги' || com === 'назвать все заметки' || del) {
        } else {
            speechSynthesis.speak(speech);

        }
    }

    componentWillReceiveProps(nextProps, prevProp) {
        this.setState({
            command: nextProps.command > this.props.command
        });
        this.checkArrCommand(nextProps.command)
        this.deleteCard(nextProps.command)
        this.speechCheck(nextProps.command)
        this.sayAllCards(nextProps.command)
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

    sayAllCards = (com) => {
        if(com === "назвать все заметки") {
            let cardsArr = this.state.cardsArray
            let text = null
            let i = 0;
            cardsArr.forEach((item) =>  {
                i += 1;
                text = 'заметка номер ' + i + ' - ' + item.title
                let speech = new SpeechSynthesisUtterance();
                speech.text = text;
                speechSynthesis.speak(speech);
            })
        }
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
        if(command === 'помощь') {
            let speech = new SpeechSynthesisUtterance();
            speech.text = 'Для создания новой заметки, скажите "Создать новую заметку". Для того что бы задать название заметки, скажите "Название заметки" и сразу без паузы назвать название заметки. Для того что бы задать описание заметки, скажите "Описание заметки" и сразу без паузы назвать описание заметки. Для того что бы сохранить заметку, нужно сказать "Сохранить заметку". Для отмены создания заметки, скажите "Отменить создание заметки". Что бы открыть заметку, скажите "Открыть заметку" и сразу без паузы скажите название нужной вам заметки. Для открытия книги скажите "Открыть книгу" и затем сразу без паузы сказать название книги. Для получения названий всех заметок или книг, скажите "Назвать все заметки, или, книги"';
            speechSynthesis.speak(speech);
        }
    }

    deleteCard(command) {
        let delCom = 'удалить заметку';
            this.state.cardsArray.map((card) => {
                if(command.indexOf(delCom) === 0 && command.slice(16) === card.title) {
                    console.log(card.title, card._id)
                    let id = card._id
                    axios.delete("http://localhost:8000/cards/" + id)
                    let speech = new SpeechSynthesisUtterance();
                    speech.text = 'заметка успешно удалена';
                    speechSynthesis.speak(speech);
                    this.update()

                }
            })
    }


    render() {
        return (
            <div className="list" onClick={this.update}>
                <p className='title'>Cards</p>
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