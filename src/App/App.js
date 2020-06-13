import React, { Component } from "react";
import Watch from "../Watch";
import TodoList from "../TodoList";
import TodoItem from "../TodoItem";
import "./App.css";
import API from "../utils/Api";
import ContentEditable from 'react-contenteditable'

// императивный стиль, а нам нужен декларативный вариант
// function get_data(){
//     let info = []
//     for(let i = 0; i < localStorage.length;i++){
//         let key = localStorage.key(i);
//         let data = localStorage.getItem(key);
//             info.push(JSON.parse(data));
//         }
//         return info;
// }
// console.log(get_data())

// localStorage.setItem("test", "test");
class App extends Component {
  constructor() {
    super();
    this.state = {
      //здесь у нас должно быть асинхронное получение дел из localstorage
      error: null,
      isLoaded: false,
      items: [],
      currentItem: { text: "sdsd", inner_key: 718237123 },
    };
  }



  async componentDidMount() {
    //Загружаем информацию из нашего асинхронного запроса
    try {
      let todoData = await API.get("/deals");

      const result = todoData.data;
      console.log(result);
      this.setState({
        isLoaded: true,
        items: result,
      });
    } catch (e) {
      console.log(e);
      console.log("Произошла ошибка во время выполнения get запроса");
    }
  }

  handleInput = (e) => {
    const itemText = e.target.value;
    const currentItem = { text: itemText, inner_key: Date.now() };
    this.setState({
      currentItem,
    });
  };

  addItem = (e) => {
    e.preventDefault();
    const newItem = this.state.currentItem;
    // let data = JSON.stringify(newItem); // здесь мы переводим это в JSON
    console.log(newItem);
    if (newItem.text !== "") {
      let items = [...this.state.items, newItem];
      API.post("/deals", {
        text: newItem.text,
        inner_key: +newItem.inner_key,
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });

      //   localStorage.setItem(newItem.inner_key, data); //здесь мы сохраняем это в localstorage
      //можно попробовать все это заменить на push с тем же успехом
      this.setState({
        items: items,
        currentItem: { text: "", inner_key: "" },
      });
    }
  };
  deleteItem = async (inner_key) => {
    // localStorage.removeItem(inner_key);
    const filterItems = this.state.items.filter((item) => {
      API.delete(`/deals/${inner_key}`)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      return item.inner_key !== inner_key;
    });
    this.setState({
      items: filterItems,
    });
  };

  updateItem = (inner_key) =>{
      const GetItem = this.state.items.filter((item) => {
          return item.inner == inner_key;
        });
        // const {update_text, update_inner_key} = GetItem;

        // this.inputElement.value = update_text;
      this.setState({
        currentItem: GetItem,
        // items: filterItems,
      });
    
}




  render() {
    return (
      <div className="main">
        <Watch />
        <TodoList
          addItem={this.addItem}
          inputElement={this.inputElement}
          handleInput={this.handleInput}
          currentItem={this.state.currentItem}
          updateItem = {this.updateItem} 
        />
        <TodoItem entries={this.state.items} deleteItem={this.deleteItem} updateItem = {this.updateItem}  />
      </div>
    );
  }
}

export default App;
