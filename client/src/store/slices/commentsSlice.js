// Задача 6: Создать slice для комментариев

// TODO: Импортируйте createSlice из Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// TODO: Создайте slice для комментариев
const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        items: [],            // массив комментариев
        selectedPostId: null  // id выбранного поста
    },
    reducers: {

        // TODO: Создайте reducer setComments
        // Устанавливает массив комментариев (при загрузке с сервера)
        setComments: (state, action) => {
            state.items = action.payload;
        },

        // TODO: Создайте reducer addComment
        // Добавляет новый комментарий в конец массива
        addComment: (state, action) => {
            state.items.push(action.payload);
        },

        // TODO: Создайте reducer removeComment
        // Удаляет комментарий по id (используйте filter)
        removeComment: (state, action) => {
            state.items = state.items.filter(comment => comment.id !== action.payload);
        },

        // TODO: Создайте reducer selectPost
        // Устанавливает выбранный пост
        selectPost: (state, action) => {
            state.selectedPostId = action.payload;
        }

    }
});

// TODO: Экспортируйте action creators
export const { setComments, addComment, removeComment, selectPost } = commentsSlice.actions;

// TODO: Экспортируйте reducer
export default commentsSlice.reducer;