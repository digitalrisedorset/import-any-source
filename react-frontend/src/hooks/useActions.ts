import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {actionCreators, type AppDispatch} from './../state'

export const useActions = () => {
    const dispatch = useDispatch<AppDispatch>()

    return bindActionCreators(actionCreators, dispatch)
}