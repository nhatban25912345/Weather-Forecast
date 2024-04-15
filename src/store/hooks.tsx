/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import Context from "./Context";
// import { InitStateType } from "./Reducer";

function useStore() {
  const [state, dispatch] = useContext(Context) as any;

  return [state, dispatch];
}

export default useStore;

// import { useContext } from "react";
// import Context from "./Context";
// import { InitStateType } from "./Reducer";

// function useStore(): [InitStateType, React.Dispatch<unknown>] {
//   const contextValue = useContext(Context);

//   if (!contextValue) {
//     throw new Error("Context value is null or undefined");
//   }

//   const [state, dispatch] = contextValue as [
//     InitStateType,
//     React.Dispatch<unknown>,
//   ];
//   console.log(dispatch);

//   return [state, dispatch];
// }

// export default useStore;
