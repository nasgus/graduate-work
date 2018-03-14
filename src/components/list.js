import React from 'react'
import Card from "./card";

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            cardsArray: [],
            isAddBlockOpened: false,
            title: '',
            desc: ''
        };
        this.toggleAddCard = this.toggleAddCard.bind(this);
        this.addToList = this.addToList.bind(this);
        this.changeTitle = this.changeTitle.bind(this)
        this.changeDesc = this.changeDesc.bind(this)
        this.openCard = this.openCard.bind(this)
    }

    toggleAddCard() {
        this.setState({
            title: '',
            desc: '',
            isAddBlockOpened: !this.state.isAddBlockOpened
        })
        console.log(this.state.cardsArray)
    }

    addToList() {
        if(this.state.title !== '' && this.state.desc !== ''){
            let card = {
                id: this.state.cardsArray.length,
                title: this.state.title,
                desc: this.state.desc
            };
            let array = this.state.cardsArray;
            array.push(card)
            this.setState({
                cardsArray: array,
                title: this.state.title,
                desc: this.state.desc,
                isAddBlockOpened: false
            })
        } else {
            alert('error')
        }

    }

    changeTitle(e) {
        console.log(e.target.value)
        this.setState({
            title: e.target.value
        })
    }

    changeDesc(e) {
        this.setState({
            desc: e.target.value
        })
    }

    openCard(e) {
        console.log(e.target)
    }

    render() {
        return(
            <div className="list">
                <p className='title'>To Do</p>
                <button className="edit grey">X</button>
                {
                    this.state.cardsArray.map((card) => {
                        return <Card data={card} openCard={this.openCard} />
                    })
                }
                {this.state.isAddBlockOpened ?
                    <div className="add-card-opened">
                        <textarea className='card-title' onChange={this.changeTitle}></textarea>
                        <textarea className='card-desc' onChange={this.changeDesc}></textarea>
                        <button className='add-card-btn grey' onClick={this.addToList}>Добавить</button>
                        <button className='cancel-card grey' onClick={this.toggleAddCard}>Х</button>
                    </div> :
                    <p className="add-card grey" onClick={this.toggleAddCard}> Добавить карточку... </p>
                }



            </div>
        )
    }
}


export default List;