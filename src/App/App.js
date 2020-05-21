import React,{Component} from 'react'
import User from '../User'
import data from '../fixtures.json'

// console.log(JSON.parse(user));
let obj = data.data[0];
let obj1 = data.data[1];
let obj2 = data.data[2];


// const {name, surname, date} = obj;
//это у нас была деструктурализация данных

class App extends Component{
    render() {
        return (
            <div>
                <h1> Привет</h1>

                <User user = {obj}/>
                <User user = {obj1}/>
                <User user = {obj2}/>
            </div>
        )
    }
}

export default App;

