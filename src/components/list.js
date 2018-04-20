import React from 'react'
import Card from "./card";

let b = 0

class CardList extends React.Component {
    constructor(props) {
        super();
        this.state = {
            cardsArray: [],
            isAddBlockOpened: false,
            title: '',
            desc: '',
            command: props.command,
        };
        this.toggleAddCard = this.toggleAddCard.bind(this);
        this.addToList = this.addToList.bind(this);
        this.changeTitle = this.changeTitle.bind(this)
        this.changeDesc = this.changeDesc.bind(this)
        this.checkArrCommand = this.checkArrCommand.bind(this)
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

            let card = {
                id: this.state.cardsArray.length,
                title: this.state.title,
                desc: this.state.desc,
                command: this.state.command,
            };
            let array = this.state.cardsArray;
            array.push(card)
            this.setState({
                cardsArray: array,
                title: this.state.title,
                desc: this.state.desc,
                date: new Date(),
                isAddBlockOpened: false
            })
        } else {
            alert('error')
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

    componentWillReceiveProps(nextProps) {
        this.setState({
            command: nextProps.command > this.props.command

        })
        this.checkArrCommand(nextProps.command)
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
            'омтенить создание заметки',
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
        ]


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
                    title: command.slice(item.length)
                })
            }
        });
        descCommand.forEach((item) => {
            if (command.indexOf(item) === 0) {
                this.setState({
                    desc: command.slice(item.length)
                })
            }
        });


    }


    render() {
        return (
            <div className="list">
                <p className='title'>To Do</p>
                <button className="edit grey">X</button>
                {
                    this.state.cardsArray.map((card) => {
                        return <Card data={card} key={b++} command={this.props.command} />
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