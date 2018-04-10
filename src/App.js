import React, {Component} from 'react';
import ListContainer from './container/listContainer'

// const command3 = [
//     {
//         command: 'удалить заметку',
//         letters: 15
//     },
//     {
//         command: 'стереть заметку',
//         letters: 15
//     },
//     {
//         command: 'вычеркнуть заметку',
//         letters: 15
//     },
//     {
//         command: 'выкинуть заметку',
//         letters: 15
//     },
//     {
//         command: 'уничтожить заметку',
//         letters: 15
//     },
//     {
//         command: 'создать заметку',
//         letters: 15
//     },
// ];


class App extends Component {




    render() {
        return (
            <div className="App">
                <ListContainer/>
            </div>
        );
    }
}

export default App;
