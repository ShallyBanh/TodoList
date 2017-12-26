import React, { Component } from "react";
import TodoItems from "./TodoItems";
import moment from 'moment';
import {
  ResourceList,
  Heading,
} from '@shopify/polaris';
import '@shopify/polaris/styles.css';

class TodoList extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      items: []
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(e){
    var itemArray = this.state.items;
   
    if (this._inputElement.value !== "") {
      var today = moment().format('MMMM Do YYYY, h:mm:ss a');
      itemArray.unshift({
        attributeOne: this._inputElement.value,
        attributeTwo: 'by Shally Banh',
        attributeThree: today,
        badges: [
          {content: 'Whoa Shally\'s doing stuff'},
        ],
        actions: [ {content: "Complete", onClick: () => this.deleteItem(today)} ]
      });
   
      this.setState({
        items: itemArray
      });
   
      this._inputElement.value = "";
    }
   
    console.log(this.state.items);
     
    e.preventDefault();

  }

  deleteItem(key) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.attributeThree !== key);
    });

    this.setState({
      items: filteredItems
    });
  }


  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <div id="title">Shallys Todo List</div>
          <form onSubmit={this.addItem}>
            <input ref={(a) => this._inputElement = a} placeholder="Enter Tasks For Today!">
            </input>
            <button type="submit">add</button>
          </form>
        </div>
        <ResourceList
          items={this.state.items}
          renderItem={(item, index) => {
            return <ResourceList.Item key={index} {...item} />;
          }}
        />
      </div>
    );
  }
}

export default TodoList;
