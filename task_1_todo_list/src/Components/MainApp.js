import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemIcon, Checkbox, ListItemText, IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const App = () => {
  const storedTodos = localStorage.getItem('todos');
  const initialTodos = storedTodos ? JSON.parse(storedTodos) : [];
  // if initial todos are present in the storage then parse them else they will start with empty array

  const [todos, setTodos] = useState(initialTodos);
  // todos holds the current state  value as initialTodos
  const [newTodo, setNewTodo] = useState('');

  // storing todos in local storage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // handling the input typed in input field
  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
    // state variable newTodo got its value from the input field
  };


  const handleAddTodo = () => {
    // if newTodo state variable has some value then new todo item will be created and
    // item them will be added to the todo array 
    // after that newtodo will again be set to empty so that field becomes empty after insertion
    if (newTodo) {
      const newTodoItem = { text: newTodo, completed: false };
      setTodos((prevTodos) => [...prevTodos, newTodoItem]);
      setNewTodo('');
    }
  };

  // complete/incomplete Switch
  const handleCompleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  //delete todo btn working
  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Todo List
            </Typography>
            <Typography variant="body2" sx={{ marginLeft: 2 }}>
              Created by Dharmvir 
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="container">
          <h1>Todo List</h1>
          <form onSubmit={handleAddTodo}>
            <TextField
              label="New Todo"
              variant="outlined"
              value={newTodo}
              onChange={handleInputChange}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddTodo}>
              Add Todo
            </Button>
          </form>
          <List>
            {todos.map((todo, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => handleCompleteTodo(index)}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={todo.text}
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? theme.palette.text.secondary : 'inherit',
                  }}
                />
                <IconButton onClick={() => handleDeleteTodo(index)}>
                  <DeleteOutline />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
