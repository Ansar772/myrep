-- Создание базы данных
CREATE DATABASE posts_comments_db;

\c posts_comments_db;

-- Создание таблицы постов
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы комментариев
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL,
    author VARCHAR(100) NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- Добавляем тестовые посты
INSERT INTO posts (title, content, author) VALUES
    ('Введение в Redux Toolkit', 'Redux Toolkit - это официальный набор инструментов для эффективной разработки с Redux. Он включает утилиты для упрощения наиболее распространенных случаев использования Redux.', 'Анна Иванова'),
    ('React Hooks в 2024', 'Хуки изменили способ написания React компонентов. В этой статье мы рассмотрим лучшие практики использования useState, useEffect и кастомных хуков.', 'Дмитрий Петров'),
    ('TypeScript для начинающих', 'TypeScript добавляет статическую типизацию в JavaScript. Это помогает находить ошибки на этапе разработки и улучшает опыт разработки.', 'Елена Смирнова'),
    ('Оптимизация производительности в React', 'Узнайте о техниках оптимизации React приложений: мемоизация, React.memo, useMemo, useCallback и многое другое.', 'Иван Козлов'),
    ('REST API: лучшие практики', 'Проектирование хорошего REST API требует понимания HTTP методов, статус кодов и правильной организации эндпоинтов.', 'Мария Волкова');

-- Добавляем несколько тестовых комментариев
INSERT INTO comments (post_id, author, text) VALUES
    (1, 'Ансар', 'Отличная статья! Redux Toolkit действительно упрощает работу с Redux.'),
    (1, 'Адам', 'Спасибо за объяснение, теперь все понятно!'),
    (2, 'Мовсар', 'Хуки - это лучшее, что произошло с React!'),
    (3, 'Линда', 'Только начала изучать TypeScript, очень помогло!');

-- Проверка создания таблиц
SELECT * FROM posts;
SELECT * FROM comments;

