import React, {Component} from "react";
import Button from "@material-ui/core/Button";

const todoItemcss = {
    "margin": "20px"
}
class TodoItem extends Component{
    createTasks = item =>{
         return (<div key= {item.inner_key} style={todoItemcss}>
            <Button>
            {item.text}
            </Button>
            <Button onClick={()=>
                this.props.deleteItem(item.inner_key)}
                variant="contained" color="secondary"> Done</Button>

            <Button onClick={()=>
                this.props.updateItem(item.inner_key)}
                variant="contained" color="primary"> Update</Button>



            </div>)
        }

        render(){
           const listEn = this.props.entries; // здесь мы получаем информацию
           const ListItem = listEn.map(this.createTasks); // здесь мы ее оборачиваем в наш метод createTasks
           return <div> {ListItem}</div> // возрвращаем обернутым в див 
        }
}

export default TodoItem;