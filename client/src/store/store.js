// Задача 7: Создать store используя configureStore

// TODO: Импортируйте configureStore из Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// TODO: Импортируйте reducers из slices
import postsReducer from './slices/postsSlice.js';
import commentsReducer from './slices/commentsSlice.js';

// TODO: Создайте и экспортируйте store
export const store = configureStore({
    reducer: {
        posts: postsReducer,
        comments: commentsReducer
    }
});

// Преимущества configureStore:
// ✅ Автоматически настраивает Redux DevTools
// ✅ Автоматически добавляет middleware для проверки мутаций
// ✅ Упрощенный синтаксис