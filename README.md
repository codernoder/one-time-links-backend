## Описание

Для запуска проекта необходимо создать файл `.env` в корне проекта. Наполнение можно посмотреть в файле `.env.example` 

Для запуска выполнить:
```bash
npm install
npm run start
```
или с помощью `docker compose`:
```bash
docker compose build
docker compose up
```

При запуске убедитесь, что на хост-машине свободны порты 3000 и 6379