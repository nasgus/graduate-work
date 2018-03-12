import React from 'react'
import Card from "./card";

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            cardsArray: [],
            isAddBlockOpened: false,
            textArea: ''
        };
        this.toggleAddCard = this.toggleAddCard.bind(this);
        this.addToList = this.addToList.bind(this);
        this.changeTextArea = this.changeTextArea.bind(this)
    }

    toggleAddCard() {
        this.setState({
            textArea: '',
            isAddBlockOpened: !this.state.isAddBlockOpened
        })
    }

    addToList() {
        if(this.state.textArea !== ''){
            let card = {
                id: this.state.cardsArray.length,
                title: this.state.textArea
            };
            let array = this.state.cardsArray;
            array.push(card)
            this.setState({
                cardsArray: array,
                title: this.state.textArea,
                isAddBlockOpened: false
            })
        } else {
            alert('error')
        }

    }

    changeTextArea(e) {
        console.log(e.target.value)
        this.setState({
            textArea: e.target.value
        })
    }

    render() {
        return(
            <div className="list">
                <p className='title'>To Do</p>
                <div className="edit">X</div>
                {
                    this.state.cardsArray.map((card) => {
                        return <Card data={card} />
                    })
                }
                {this.state.isAddBlockOpened ?
                    <div className="add-card-opened">
                        <textarea onChange={this.changeTextArea}></textarea>
                        <button onClick={this.addToList}>Добавить</button>
                        <button onClick={this.toggleAddCard}>Х</button>
                    </div> :
                    <p className="add-card" onClick={this.toggleAddCard}> Добавить карточку... </p>
                }



            </div>
        )
    }
}


export default List;