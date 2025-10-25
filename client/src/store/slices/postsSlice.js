// Задача 5: Создать slice для постов

// TODO: Импортируйте createSlice из Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// TODO: Создайте slice для постов
const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        items: []  // массив постов
    },
    reducers: {
        // TODO: Создайте reducer setPosts
        // Принимает массив постов и сохраняет в items
        setPosts: (state, action) => {
            state.items = action.payload;
        }
    }
});

// TODO: Экспортируйте action creators
export const { setPosts } = postsSlice.actions;

// TODO: Экспортируйте reducer
export default postsSlice.reducer;