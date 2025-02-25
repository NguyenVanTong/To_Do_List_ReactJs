import React, {useState, useEffect, useRef, useMemo, useReducer} from "react";
import 'bootstrap'
//Ham reducer de xu ly cac hanh dong
const todoReducer =(state, action) =>{
    switch (action.type) {
        case 'ADD':
            return[...state, action.payload];
        case 'TOGGLE':
            return state.map((todo) =>
                todo.id === action.payload ? {...todo, completed: !todo.completed} : todo
            );
        case 'DELETE':
            return state.filter((todo) => todo.id !== action.payload);
        default:
            return state;
    }

};

const App = () => {
    //state quan ly danh sach cong viec va gia tri cua o input
    const [todos, dispatch] = useReducer(todoReducer, []);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef();
}

useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
        dispatch({type: 'SET', payload: storedTodos});
    }
}, []);

useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);

const filteredTodos = useMemo(() => {
    return {
        imcomplete: todos.filter((todo) => !todo.completed),
        completed: todos.filter((todo) => todo.completed),
    };
}, [todos]);

const handleAddTodo = () => {
    if(!inputValue) return;
    const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
    };
    dispatch({type: 'ADD', payload: newTodo});
    setInputValue('');
    inputRef.current.focus();
};

const handleToggleTodo = (id) => {
    dispatch({type: 'TOGGLE', payload: id});
}

const handleDeleteTodo = (id) => {
    dispatch({type: 'DELETE', payload: id});
}
export default function Todo() {}