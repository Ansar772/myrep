// Задача 10.3: CommentsList - список комментариев

import axios from 'axios';
// TODO: Импортируйте useSelector и useDispatch
import { useSelector, useDispatch } from 'react-redux';

// TODO: Импортируйте action creator removeComment
import { removeComment } from '../store/slices/commentsSlice.js';

// TODO: Импортируйте API из конфигурации
import { API } from '../api/config.js';

import './CommentsList.css';

export default function CommentsList() {
  // TODO: Получите комментарии из Redux
  const comments = useSelector(state => state.comments.items)

  // TODO: Получите dispatch
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить этот комментарий?')) {
      return;
    }

    try {
      // TODO: Отправить DELETE запрос через axios на ${API}/comments/${id}
      await axios.delete(`${API}/comments/${id}`)
      
      // TODO: Удалить комментарий из Redux
      dispatch(removeComment(id)); // action creator removeComment(id)
    } catch (err) {
      console.error('Ошибка удаления комментария:', err);
      alert('Ошибка при удалении комментария');
    }
  };

  // Функция для форматирования даты. Уже всё сделано. Не трогайте.
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="comments-list-container">
      <h3>📝 Все комментарии ({comments.length})</h3>
      
      {comments.length === 0 ? (
        <p className="no-comments">Комментариев пока нет. Будьте первым!</p>
      ) : (
        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <span className="comment-author">{comment.author}</span>
                <span className="comment-date">{formatDate(comment.created_at)}</span>
              </div>
              <p className="comment-text">{comment.text}</p>
              <button
                onClick={() => handleDelete(comment.id)}
                className="delete-button"
              >
                🗑️ Удалить
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

