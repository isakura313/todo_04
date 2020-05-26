import React, {Component} from "react";
import Button from "@material-ui/core/Button";

class TodoItem extends Component{
    createTasks = item =>{
         return (<div key= {item.inner_key}>
            <Button>
            {item.text}
            </Button>
            <Button onClick={()=>
                this.props.deleteItem(item.inner_key)}
                color="Secondary"> Done</Button>
            </div>)
        }

        render(){
           const listEn = this.props.entries; // здесь мы получаем информацию
           const ListItem = listEn.map(this.createTasks); // здесь мы ее оборачиваем в наш метод createTasks
           return <div> {ListItem}</div> // возрвращаем обернутым в див 
        }
}

export default TodoItem;