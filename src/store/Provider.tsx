import { ReactNode, useReducer } from "react";
import Context from "./Context";
import reducer, { initState } from "./Reducer";

function Provider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <Context.Provider value={[state, dispatch] as unknown as null}>
      {children}
    </Context.Provider>
  );
}

export default Provider;
