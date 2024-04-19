/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import Context from "./Context";

function useStore() {
  const [state, dispatch] = useContext(Context) as any;

  return [state, dispatch];
}

export default useStore;
