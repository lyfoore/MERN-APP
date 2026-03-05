# MERN App + Telegram Bot

Приложение для записи на приём с интеграцией Telegram бота.

## 📋 Компоненты

- **Frontend**: React + Vite + Ant Design 5
- **Backend**: Express.js + MongoDB
- **Telegram Bot**: node-telegram-bot-api
- **Database**: MongoDB 7
- **Containerization**: Docker Compose

## 🚀 Быстрый старт

### 1. Получите токен Telegram бота

1. Откройте Telegram и найдите [@BotFather](https://t.me/BotFather)
2. Отправьте команду `/newbot`
3. Введите имя и username для бота
4. Скопируйте полученный токен

### 2. Настройте переменные окружения

```bash
cp .env.example .env
```

Отредактируйте `.env` и вставьте ваш токен:
```
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
```

### 3. Запустите через Docker Compose

```bash
docker-compose up --build
```

## 🌐 Доступ

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

## 📱 Как использовать

1. Откройте Telegram и найдите вашего бота
2. Отправьте команду `/start`
3. Введите ваше имя
4. Введите время записи в формате `ДД.ММ.ГГГГ ЧЧ:ММ` (например: `15.03.2026 14:30`)
5. Данные появятся в таблице на фронтенде

## 🎨 Особенности

- **Анти дизайн**: Таблица, кнопки, переключатель темы
- **Тёмная/Дневная тема**: Переключатель в правом верхнем углу
- **Автообновление**: Данные обновляются каждые 5 секунд
- **Сортировка**: По имени и времени
- **Пагинация**: Настройка количества записей на странице
- **Удаление**: Подтверждение перед удалением

## 🛠 Остановка

```bash
docker-compose down
```

Для удаления данных MongoDB:
```bash
docker-compose down -v
```

## 📁 Структура проекта

```
MERN-APP/
├── backend/
│   ├── models/
│   │   └── Appointment.js
│   ├── bot.js
│   ├── server.js
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── nginx.conf
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🔧 Разработка

### Backend (локально)

```bash
cd backend
npm install
npm run dev
```

### Frontend (локально)

```bash
cd frontend
npm install
npm run dev
```

## 📦 Используемые компоненты Ant Design

| Компонент | Описание |
|-----------|----------|
| Table | Таблица с сортировкой и пагинацией |
| Button | Кнопки для действий |
| ConfigProvider | Управление темой |
| Typography | Типографика |
| Space | Расположение элементов |
| Popconfirm | Подтверждение удаления |
| Empty | Состояние "нет данных" |
| Spin | Индикатор загрузки |
| message | Уведомления |
