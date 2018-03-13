import React from 'react'

class Card extends React.Component {
    constructor() {
        super()
    }

    render() {
        const {data, openCard} = this.props;
        return(
            <div onClick={openCard} className='card' key={data.id} id={data.id}>
                    {data.title}
            </div>
        )
    }
}

export default Card;