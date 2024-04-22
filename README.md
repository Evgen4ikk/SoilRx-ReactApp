# Архитектура проекта

Для разработки функционала следует придерживаться архитектуре [Feature-Sliced Design](https://feature-sliced.design/)

![Модель использования FSD](.gitlab/static/image.png)

```text
├── app/
| # Слой композиции приложения
| # Содержит обертки для приложения
| providers/
| | ├──AuthProvider
| # Содержит в себе обёртку для авторизации пользователя
| | ├──ErrorBoundary
| # Содержит в себе обёртку для обработки ошибок
| | ├──RouterProvider
| # Содержит в себе обёртку для маршрутизации по приложению
| | ├──StoreProvider
| # Содержит в себе обёртку для хранения состояния приложения
| ├──App
| # Содержит в себе обёртку для маршрутизации по приложению
| ├──index.css
| # Точка входа для Tailwind CSS и содержит глобальные стили проекта
|
├── pages/
| # Композиционный слой для сборки полноценных страниц из сущностей, фич и виджетов.
| ├── AddFieldPage
| # Страница добавления поля
| ├── EditFieldPage
| # Страница редактирования поля
| ├── FieldDetailPage
| # Страница c деталями конкретного поля
| ├── FieldsPage
| # Страница со списокм всех полей
| ├── ForgotPasswordPage
| # Страница забыли пароль
| ├── LoginPage
| # Страница авторизации
| ├── MainPage
| # Главная страница на которой изображена работа приложения
| ├── PlotFormPage
| # Страница создания/редактирования участка для поля
| ├── PlotPage
| # Страница с деталями конкретного участка
| ├── ProfilePage
| # Страница профиля пользователя
| ├── RegistrationPage
| # Страница регистрации
| ├── ResetPasswordPage
| # Страница сброса пароля 
|
├── widgets/
| # Композиционный слой для соединения сущностей и фич в самостоятельные блоки
| ├── ErrorMessage
| ├── Header
| ├── Layout
| ├── Footer
| ├── ProfileInformation
| ├── RecomendationSidebar
|
├── features/
| # Взаимодействия с пользователем, действия, которые несут бизнес-ценность для пользователя.
| ├── AddAnalysisModal
| ├── AddField
| ├── AddPlot
| ├── AnalysResult
| ├── AuthByEmail
| ├── ChemicalAnalysisCard
| ├── ConfirmRemoveForm
| ├── CultureRecommendation
| ├── CultureSelect
| ├── CurrentRecommendation
| ├── FieldCard
| ├── FieldDetailCard
| ├── ForgotPassword
| ├── HeaderProfile
| ├── HydrogenUnloadingCard
| ├── ForgoPersonalInformationFormtPassword
| ├── PersonalSafety
| ├── PlotList
| ├── PlotStack
| ├── RecommendationList
| ├── ResetPassword
| ├── SoilRecommendation
| ├── StackItem
| ├── UploadField
| ├── UploadItem
| ├── WideInfoCard
|
├── entities/
| # Бизнес-сущности
| ├── Auth
| ├── common
| ├── field
| ├── plot
| ├── recomendation
| ├── user
|
├── shared/
| # Переиспользуемый код, не имеющий отношения к специфике приложения/бизнеса.проекту
| | ├── ui/
| | # Содержит в себе переиспользуемые UI-элементы
| | | ├── Input/
| | | | ├── Input
| | | | # UI-элемент текстового поля
| | | | ├── Input.stories
| | | | # Импортирование UI-элемента в StoryBook
├── main
| # Точка входа в приложение
```

## Правила нейминга в коде 

| camelCase  |        PascalCase         |             kebab-case              |
|:----------:|:-------------------------:|:-----------------------------------:|
| Переменные | Функциональные компоненты | Переменные конфигурационных файлов  |
|   Методы   |          Классы           |                                     |
|  Функции   |                           |                                     |

*Хуки называть по правилам [React](https://react.dev/reference/react/hooks)<br/>
*Неупомянутые аспекты называть в соответствии с [AirBnb](https://github.com/airbnb/javascript)

## Правила нейминга в файловой системе

| camelCase |        PascalCase         |
|:---------:|:-------------------------:|
|   Слои    | Функциональные компоненты |
|  Слайсы   |          Классы           |
| Сегменты  |                           |

*Хуки называть по правилам [React](https://react.dev/reference/react/hooks)

## Внешние зависимости

### Маршрутизация проекта
- React Router

### Стилизация проекта
- Ant Design

### Работа с API
- RTK-Query

### Библиотеки для разработки собственной бибилиотеки UI-компонентов
- Ant Design
- Zod (Валидация форм)
- react-hook-form (Для обработки событий и взаимодействия с формами)

### Библиотеки для тестирования компонентов
- Storybook

### Библиотеки для сборки проекта
- Vite

### CI/CD библиотеки
- Prettier (AirBnb)
- Eslint (AirBnb)

### Ссылка на сайт
Ссылка на сайт - [SoilRx](https://soilrx.abdrashitov-academy.ru/)

## Скрипты для запуска и тестирования
- ```npm run dev``` запуск в режиме разработчика
- ```npm run build``` cборка приложения
- ```npm run preview``` запуск в режиме production
- ```npm run sb``` запуск Storybook
- ```npm install``` для загрузки всех необходимых зависимостей
