import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {

  // This is going to be the list of the todos that should be done
  // this is going to be a list of dictionaries 
  const [todos, setTodos] = useState([]);

  // This is the new value that has been intered by the user for the new heading 
  const [headingInput, setHeadingInput] = useState('');

  // The list to put the value for each todo 
  // we are going to consider a dictionary for the inputs for each heading 
  // as it may happen that one person add a record to both headings but not adding them 
  // in this case we can distinguish between the inputs given for each heading 
  const [listInputs, setListInputs] = useState({})

  // add the function in order to add a new heading to the list 
  const handleAddTodo = () => {

    // check if the input field is not empty 
    if (headingInput.trim() !== '') {

      // if the new entered heading is not empty string
      // then add it's entry to the list of todos
      setTodos([...todos, { heading: headingInput, lists: [] }]);

      // set the headingInput again to empty 
      setHeadingInput('');
    }
  };

  // this function will add a list to a specific heading 
  const handleAddList = (index) => {
    // check if the input is not empty or whitespace
    if (listInputs[index] && listInputs[index].trim() !== '') {

      // create a copy of the current list of todos 
      const newTodos = [...todos];

      // add this new list item to the corresponding heading 
      newTodos[index].lists.push(listInputs[index])

      // update the todos 
      setTodos(newTodos)

      // clear the input field for that specific index 
      setListInputs({ ...listInputs, [index]: '' })
    }
  };

  // Function to update list input value for a specific heading index
  const handleListInputChange = (index, value) => {
    setListInputs({ ...listInputs, [index]: value }); // Update the listInputs state for the corresponding index
  };


  // this function will delete the whole doto list 
  const handleDeleteTodo = (index) => {

    // first create a copy of the current list of todos
    const newTodos = [...todos];

    // remove the todo at the given index
    newTodos.splice(index, 1);

    // update the todolist to the new updated todolist
    setTodos(newTodos);
  }



  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter heading"
            // e represent an event object where from there we can access the tag that has triggered this event
            // e.target represent the tag that has triggered that event, e which in this case is the input tag
            // e.target.value is the value from the tag that has triggered the event, which in this case is the text that has been entered to the input tag
            onChange={(e) => { setHeadingInput(e.target.value); }}
          />

          {/* when the button is clicked, we can call the other function to take care of adding the heading to the list of headings*/}
          <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>
        </div>
      </div>


      {/* this is the div tag that will include the cards of the items*/}
      <div className="todo_main">

        {/* go over the todo list, and create the div tag for each of the items */}
        {todos.map((todo, index) => (

          <div key={index} className="todo-card"> {/* for the current item, create the card of it*/}

            {/* we are going to show the heading of the todo */}
            <div className="heading_todo">

              {/* as each todo, is a dictionary, then we can access the property using .*/}
              <h3>{todo.heading}</h3>
              {/* we will have a button for each heading to remove it*/}
              <button className='delete-button-heading' onClick={() => handleDeleteTodo(index)}>Delete Heading</button>
            </div>

            <ul>
              {/* Iterate over each list item inside the current todo */}
              {todo.lists.map((list, listIndex) => (
                <li key={listIndex} className='todo_inside_list'>
                  {/* Display the text content of the list item */}
                  <p>{list}</p>
                </li>
              ))}
            </ul>

            {/* for each heading we will add multiple lists*/}
            <div className='add_list'>

              {/* this is the input field, where to add the new list to this heading*/}
              <input type='text' className='list-input' placeholder='Add List' value={listInputs[index] || ''} onChange={(e) => handleListInputChange(index, e.target.value)} />

              {/* a button to add the list to the corresponding heading*/}
              <button className='add-list-button' onClick={() => handleAddList(index)}>Add List</button>
            </div>

          </div>
        ))}

      </div>
    </>
  );
};

export default TodoList;
