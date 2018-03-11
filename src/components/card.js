import React from 'react'

class Card extends React.Component {
    constructor() {
        super()
    }

    render() {
        const {data} = this.props;
        return(
            <div className='card' key={data.id}>
                <h3>
                    {data.title}
                </h3>
            </div>
        )
    }
}

export default Card;