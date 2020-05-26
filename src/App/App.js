import React, {Component} from 'react'
import Watch from '../Watch'
import TodoList from "../TodoList";
import TodoItem from "../TodoItem";



class App extends Component{
constructor(){
    super()
    this.state = {
        items: [],
        currentItem: {text: "первое дело", inner_key: "firstItem"}
    }
}
handleInput = e =>{
    const itemText = e.target.value;
    const currentItem = {text: itemText, inner_key: Date.now()}
    // console.log(currentItem);
    this.setState({
        currentItem,
    })
}

addItem = e => {
    e.preventDefault();
    const newItem = this.state.currentItem;
    console.log(newItem)
    if (newItem.text !== ''){
        let items = [...this.state.items, newItem];
        //можно попробовать все это заменить на push с тем же успехом
        this.setState({
            items:items,
            currentItem: {text: "", inner_key:""}
        })
    }
}
deleteItem = inner_key =>{
    const filterItems = this.state.items.filter(item => {
        return item.inner_key != inner_key;
    })
    this.setState({
        items: filterItems
    })
}



    render() {
        return (
            <div>
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

