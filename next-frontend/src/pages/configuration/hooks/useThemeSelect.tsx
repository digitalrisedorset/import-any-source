import {useAppDispatch} from "@/redux-state/store";
import { setActiveTheme } from "@/redux-state/configurationSlice";

export const useThemeSelect = (theme: string) => {
    const dispatch = useAppDispatch();

    const setCurrentTheme = (theme: string) => {
        dispatch(setActiveTheme(theme))
    }

    return setCurrentTheme
}