const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Настройка подключения к БД — укажите свои данные
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'posts_comments_db',
    password: '123', // ИЗМЕНИТЕ на ваш пароль
    port: 5432,
});

// ============================================
// Задача 3.1: GET /posts
// Назначение: Получить все посты из базы данных
// ============================================
app.get('/posts', async(req, res) => {
    try {
        // TODO: Выполнить SQL запрос для получения всех постов
        // Подсказки:
        // 1. Используйте pool.query() для выполнения SQL
        // 2. Запрос: SELECT  ...
        // 3. Результат находится в result.rows
        // 4. Верните JSON: res.json(result.rows)
        const result = await pool.query(`
            SELECT * FROM posts
        `)

        res.json(result.rows);

        // Пример структуры:
        // const result = await pool.query('ваш SQL запрос');
        // res.json(result.rows);

    } catch (err) {
        console.error(err);
        // TODO: Вернуть ошибку с статусом 500
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

// ============================================
// Задача 3.2: GET /comments/:postId
// Назначение: Получить все комментарии для конкретного поста
// ============================================
app.get('/comments/:postId', async(req, res) => {
    try {
        // TODO: Извлечь postId из параметров маршрута
        const { postId } = req.params;

        // TODO: Выполнить SQL запрос для получения комментариев
        // Подсказки:
        // 1. Запрос: SELECT * FROM comments WHERE post_id = ...
        // 2. Параметры: [postId]
        // 3. const result = await pool.query('SQL', [postId]);
        // 4. Верните res.json(result.rows)
        const result = await pool.query(`
            SELECT * FROM comments WHERE post_id = $1
        `, [postId])

        res.json(result.rows);

    } catch (err) {
        console.error(err);
        // TODO: Вернуть ошибку с статусом 500
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

// ============================================
// Задача 3.3: POST /comments
// Назначение: Добавить новый комментарий
// Body: { post_id, author, text }
// ============================================
app.post('/comments', async(req, res) => {
    try {
        // TODO: Извлечь данные из тела запроса
        const { post_id, author, text } = req.body;

        // TODO: Валидация - проверить, что author заполнен
        // Подсказки:
        // 1. Проверить: !author || !author.toString().trim()
        // 2. Если пусто: return res.status(400).json({ error: 'Автор обязателен' });
        if (!author || !author.toString().trim()) return res.status(400).json({ error: 'Автор обязателен' });

        // TODO: Валидация - проверить, что text заполнен
        // Если пусто: return res.status(400).json({ error: 'Текст комментария обязателен' });
        if (!text || !text.toString().trim()) return res.status(400).json({ error: 'Текст комментария обязателен' });

        // TODO: Валидация - проверить, что post_id это число
        // Подсказки:
        // 1. Проверить: !post_id
        // 2. Если не валидно: return res.status(400).json({ error: 'Некорректный ID поста' });
        if (!post_id) return res.status(400).json({ error: 'Некорректный ID поста' });

        // TODO: Выполнить INSERT запрос
        // Подсказки:
        // 1. SQL: INSERT INTO comments ...
        // 2. Используйте trim() для удаления пробелов: author.trim(), text.trim()
        // 3. Передайте параметры: [post_id, author.trim(), text.trim()]
        // 4. const result = await pool.query('SQL', [параметры]);
        const result = await pool.query(`
            INSERT INTO comments (post_id, author, text) VAlUES ($1, $2, $3) RETURNING *
        `, [post_id, author.trim(), text.trim()])

        // TODO: Вернуть созданный комментарий со статусом 201
        res.status(201).json(result.rows[0]);

    } catch (err) {
        console.error(err);
        // TODO: Вернуть ошибку с статусом 500
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

// ============================================
// Задача 3.4: DELETE /comments/:id
// Назначение: Удалить комментарий по id
// ============================================
app.delete('/comments/:id', async(req, res) => {
    try {
        // TODO: Извлечь id из параметров маршрута
        const { id } = req.params;

        // TODO: Выполнить DELETE запрос
        // Подсказки:
        // 1. SQL: DELETE FROM ...
        // 2. Параметры: [id]
        // 3. const result = await pool.query('SQL', [параметры]);
        const result = await pool.query(`
            DELETE FROM comments WHERE id = $1
        `, [id])

        // TODO: Проверить, что комментарий был найден и удален
        // Подсказки:
        // 1. if (result.rows.length === 0)
        // 2. return res.status(404).json({ error: 'Комментарий не найден' });
        if (result.rows.length === 0) return res.status(404).json({ error: 'Комментарий не найден' });

        // TODO: Вернуть id удаленного комментария
        res.json({ id: result.rows[0].id });

    } catch (err) {
        console.error(err);
        // TODO: Вернуть ошибку с статусом 500
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
    console.log('Доступные эндпоинты:');
    console.log('  GET    /posts           - Получить все посты');
    console.log('  GET    /comments/:postId - Получить комментарии поста');
    console.log('  POST   /comments        - Добавить комментарий');
    console.log('  DELETE /comments/:id    - Удалить комментарий');
});