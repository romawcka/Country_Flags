import { useDispatch } from "react-redux"
import { clearControls } from "./controls-slice"

export const useCleanUp = () => {
  const dispatch = useDispatch();

  const cleanUp = () => dispatch(clearControls()) // очистка всех фильтров

  return cleanUp;
}