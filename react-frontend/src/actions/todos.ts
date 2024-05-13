import axios from 'axios'
import {Dispatch} from "redux";
import { ActionTypes} from "./types";

const todoUrl = 'https://jsonplaceholder.typicode.com/todos'

export interface FetchToDoAction {
    type: ActionTypes.fetchToDo,
    payload: Todo[]
}

export interface DeleteToDoAction {
    type: ActionTypes.deleteToDo;
    payload: number;
}

export interface Todo {
    id: number
    userId: number;
    title: string;
    completed: boolean
}

export const fetchToDos = () => {
    return async (dispatch: Dispatch) => {
        const response = await axios.get<Todo[]>(todoUrl)

        dispatch<FetchToDoAction>({
            type: ActionTypes.fetchToDo,
            payload: response.data
        })
    }
}

export const deleteToDo = (id: number): DeleteToDoAction => {
    return {
        type: ActionTypes.deleteToDo,
        payload: id
    }
}