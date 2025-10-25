// Задача 9: App.jsx - главный компонент и загрузка постов

import { useEffect } from 'react';
import axios from 'axios';
// TODO: Импортируйте useDispatch
import { useDispatch } from 'react-redux';

// TODO: Импортируйте action creator setPosts
import { setPosts } from './store/slices/postsSlice.js';

// TODO: Импортируйте API из конфигурации
import { API } from './api/config.js';

import PostsList from './components/PostsList.jsx';
import CommentSection from './components/CommentSection.jsx';
import './App.css';

export default function App() {
  // TODO: Получите функцию dispatch
  const dispatch = useDispatch();

  // TODO: Загрузить посты с сервера при монтировании компонента
  useEffect(() => {
    // Выполнить GET запрос к ${API}/posts
    async function name() {
      const res = await axios.get(`${API}/posts`);
      dispatch(setPosts(res.data))
    }
    name()
    // После успешного ответа dispatch(setPosts(res.data))
  }, []); // пустой массив зависимостей - выполнится один раз

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>💬 Комментарии к постам</h1>
        <p className="subtitle">Управление через Redux Toolkit</p>
      </header>

      <div className="app-content">
        <PostsList />
        <CommentSection />
      </div>
    </div>
  );
}

