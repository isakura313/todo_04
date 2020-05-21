import React,{Component} from 'react'

//компонент на вход принимал целый объект
// деструктурализируем
// отрисовываем

class User extends Component{

    createUser = user =>{
    return(<div>
            <h3> Пост от:  {user.name} </h3>
            <h5>  Фамилия {user.surname}</h5>
            <h5> Дата поста: {user.date}</h5>
            <p> Сообщение: {user.message}</p>
        </div>)
    }
    render(){
        const data = this.props.user;
        const user = this.createUser(data)
        return <div> {user}</div>;
    }
}

export default User;