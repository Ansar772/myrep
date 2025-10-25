// CommentForm - форма добавления комментария

import { useState } from 'react';
import axios from 'axios';
// TODO: Импортируйте useSelector и useDispatch
import { useSelector, useDispatch } from 'react-redux';

// TODO: Импортируйте action creator addComment
import { addComment } from '../store/slices/commentsSlice.js';

// TODO: Импортируйте API из конфигурации
import { API } from '../api/config.js';

import './CommentForm.css';

export default function CommentForm() {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  // TODO: Получите selectedPostId из Redux
  const selectedPostId = useSelector(state => state.comments.selectedPostId);

  // TODO: Получите dispatch
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация
    if (!author.trim() || !text.trim()) {
      alert('Заполните все поля');
      return;
    }

    // Этот объет нужно отправить на сервер внизу
    const commentData = {
      post_id: selectedPostId,
      author: author.trim(),
      text: text.trim()
    };

    try {
      // TODO: Отправить POST запрос через axios на ${API}/comments с телом commentData
      const response = await axios.post(`${API}/comments`, commentData)
      
      // TODO: Добавить комментарий в Redux
      dispatch(addComment(response.data)); // action creator addComment(response.data)

      // Очистить форму
      setAuthor('');
      setText('');
    } catch (err) {
      console.error('Ошибка добавления комментария:', err);
      alert('Ошибка при добавлении комментария');
    }
  };

  return (
    <div className="comment-form-container">
      <h3>➕ Добавить комментарий</h3>
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Ваше имя"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="form-input"
        />
        <textarea
          placeholder="Ваш комментарий"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-textarea"
          rows="4"
        />
        <button type="submit" className="submit-button">
          Отправить
        </button>
      </form>
    </div>
  );
}

