import { Todo, ActionTypes, Action } from "../actions";


export const todosReducer = (state: Todo[] = [], action: Action): Todo[] => {
    switch (action.type) {
        case ActionTypes.fetchToDo:
            return action.payload
        case ActionTypes.deleteToDo:
            return state.filter((todo: Todo) => todo.id !== action.payload)
        default:
            return state
    }
}