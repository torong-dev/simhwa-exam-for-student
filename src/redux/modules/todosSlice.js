import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from "../../utils";
import nextId from "react-id-generator";

// __addToDo 답안
export const __addToDo = createAsyncThunk(
  "__addToDo",
  async (payload, thunkAPI) => {
    await waitTwoSeconds(); // 2초 지연

    const newTodo = {
      // 새로운 할 일 생성
      id: nextId(),
      title: payload.title,
      body: payload.body,
    };

    thunkAPI.dispatch(addTodo(newTodo)); // 상태 추가
    return newTodo;
  }
);

// __deleteToDo 답안
export const __deleteTodo = createAsyncThunk(
  "__deleteToDo",
  async (id, thunkAPI) => {
    await waitTwoSeconds(); // 2초 지연

    thunkAPI.dispatch(deleteTodo(id)); // 상태 삭제
    return id;
  }
);

const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload); // 상태 업데이트
    },
    deleteTodo: (state, action) => {
      const idTodoDelete = action.payload;
      state.list = state.list.filter((todo) => todo.id !== idTodoDelete);
    },
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
