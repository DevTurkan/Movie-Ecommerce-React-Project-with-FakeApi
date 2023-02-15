import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../store/reducers/index/index";


export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
