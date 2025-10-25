# Серверная часть - Комментарии к постам

## Установка

```bash
npm install
```

## Настройка

Откройте `index.js` и измените настройки подключения к PostgreSQL:

```javascript
const pool = new Pool({
    user: 'postgres',              // ваш пользователь
    host: 'localhost',
    database: 'posts_comments_db', // имя БД
    password: 'ваш_пароль',        // ваш пароль
    port: 5432,
});
```

## Запуск

```bash
node index.js
```

Сервер запустится на порту 5000.

## API эндпоинты

- `GET /posts` - получить все посты
- `GET /comments/:postId` - получить комментарии для поста
- `POST /comments` - добавить комментарий
- `DELETE /comments/:id` - удалить комментарий

## Проверка

Откройте в браузере:
- http://localhost:5000/posts - список постов
- http://localhost:5000/comments/1 - комментарии первого поста

