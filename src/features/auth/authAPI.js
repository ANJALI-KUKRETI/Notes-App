
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase";


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(login({email,password}))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const login = createAsyncThunk(
  'user/loginUser',
  async ({email, password}, { rejectWithValue } ) => {
    try {
      const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )
        return response
      } catch (error) {
        return rejectWithValue(error.message)
      }
  }
);

export const signup = createAsyncThunk(
  'user/signUpUser',
  async ({email, password}, { rejectWithValue } ) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log(response);
      alert('created')
      // The value we return becomes the `fulfilled` action payload
      return response;
    } catch (error) {
      rejectWithValue(error)
    }
  }
);

