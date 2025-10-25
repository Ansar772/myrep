// Задача 10.2: CommentSection - секция комментариев с формой и списком

// TODO: Импортируйте useSelector
import { useSelector } from 'react-redux';

import CommentForm from './CommentForm.jsx';
import CommentsList from './CommentsList.jsx';
import './CommentSection.css';

export default function CommentSection() {
  // TODO: Получите id выбранного поста из Redux
  const selectedPostId = useSelector(state => state.comments.selectedPostId);

  return (
    <div className="comments-section">
      <h2>💬 Комментарии</h2>
      
      {!selectedPostId ? (
        <div className="no-post-selected">
          <p>👈 Выберите пост, чтобы увидеть комментарии</p>
        </div>
      ) : (
        <>
          <CommentForm />
          <CommentsList />
        </>
      )}
    </div>
  );
}

