// Задача 10.1: PostsList - список постов

import axios from 'axios';
// TODO: Импортируйте useSelector и useDispatch
import { useSelector, useDispatch } from 'react-redux';

// TODO: Импортируйте action creators selectPost и setComments
import { selectPost, setComments } from '../store/slices/commentsSlice.js';

// TODO: Импортируйте API из конфигурации
import { API } from '../api/config.js';

import './PostsList.css';

export default function PostsList() {
  // TODO: Получите посты из Redux
  const posts = useSelector(state => state.posts.items)
  
  // TODO: Получите id выбранного поста
  const selectedPostId = useSelector(state => state.comments.selectedPostId)
  
  // TODO: Получите dispatch
  const dispatch = useDispatch()

  const handleSelectPost = (postId) => {
    // TODO: Отметить пост как выбранный
    dispatch(selectPost(postId)); // action creator selectPost(postId)
    
    // TODO: Загрузить комментарии этого поста
    // Выполнить GET запрос к ${API}/comments/${postId}
    // После успешного ответа dispatch(setComments(res.data))
    const res = axios.get(`${API}/comments/${postId}`)
    dispatch(setComments(res.data))
  };

  return (
    <div className="posts-section">
      <h2>📚 Список постов</h2>
      <div className="posts-list">
        {posts.map(post => (
          <div
            key={post.id}
            className={`post-card ${selectedPostId === post.id ? 'active' : ''}`}
            onClick={() => handleSelectPost(post.id)}
          >
            <h3>{post.title}</h3>
            <p className="post-author">Автор: {post.author}</p>
            <p className="post-content">{post.content.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

