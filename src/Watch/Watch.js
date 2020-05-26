import React, {Component} from 'react';
import './Watch.css';

class Watch extends Component{
    constructor(props){
        super(props); //вызывает конструктор родителя Component c данными свойствами
        this.state = {date: new Date()} // создаем у нас состояние
    }

    componentDidMount(){
        //в этой части жизненного цикла он будет создаваться
        this.timerid = setInterval(() => this.tick(), 1000)
        // у нас есть свойство, которое получает значение из анонимной функции
    }
    componentWillUnmount(){
        clearInterval(this.timerid)
    }
    tick(){
        this.setState({
            date: new Date()
        });
    }
    render(){
        return(
            <div className='watch'>
                <button className="watch__button"> Сегодня: {this.state.date.toLocaleDateString()}</button>
                <h3 className="watch__h3">  Текущее время: {this.state.date.toLocaleTimeString()}</h3>
            </div>
        )
    }
    
}
export default Watch;
