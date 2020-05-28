import React, {Component} from 'react'
import Watch from '../Watch'
import TodoList from "../TodoList";
import TodoItem from "../TodoItem";
import "./App.css"



 // императивный стиль, а нам нужен декларативный вариант
function get_data(){
    let info = []
    for(let i = 0; i < localStorage.length;i++){
        let key = localStorage.key(i);
        let data = localStorage.getItem(key);
            info.push(JSON.parse(data));
        }
        return info;
}
console.log(get_data())


// localStorage.setItem("test", "test");
class App extends Component{
constructor(){

    super()
    this.state = {
        //здесь у нас должно быть асинхронное получение дел из localstorage
        items: get_data(),
        currentItem: {text: "первое дело", inner_key: "firstItem"}
    }
}
handleInput = e =>{
    const itemText = e.target.value;
    const currentItem = {text: itemText, inner_key: Date.now()}
    this.setState({
        currentItem,
    })
}

addItem = e => {
    e.preventDefault();
    const newItem = this.state.currentItem;
    let data = JSON.stringify(newItem); // здесь мы переводим это в JSON
    console.log(newItem)
    if (newItem.text !== ''){
        let items = [...this.state.items, newItem];
        localStorage.setItem(newItem.inner_key, data); //здесь мы сохраняем это в localstorage
        //можно попробовать все это заменить на push с тем же успехом
        this.setState({
            items:items,
            currentItem: {text: "", inner_key:""}
        })
    }
}
deleteItem = inner_key =>{
    localStorage.removeItem(inner_key);
    const filterItems = this.state.items.filter(item => {
        return item.inner_key !== inner_key;
    })
    this.setState({
        items: filterItems
    })
}



    render() {
        return (
            <div className="main">
            <Watch />
            <TodoList 
            addItem = {this.addItem}
            inputElement = {this.inputElement}
            handleInput = {this.handleInput}
            currentItem = {this.state.currentItem}
            />
            <TodoItem entries = {this.state.items} deleteItem = {this.deleteItem} />
            </div>
        )
    }
}

export default App;

