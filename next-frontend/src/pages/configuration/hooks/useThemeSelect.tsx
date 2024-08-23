import {useAppDispatch} from "@/state/store";
import { setActiveTheme } from "@/state/configurationSlice";

export const useThemeSelect = (theme: string) => {
    const dispatch = useAppDispatch();

    const setCurrentTheme = (theme: string) => {
        dispatch(setActiveTheme(theme))
    }

    return setCurrentTheme
}