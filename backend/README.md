# Backend Setup

## SQL Server Connection

The backend reads database settings from `backend/.env`.



```env
DB_SERVER=127.0.0.1
DB_PORT=1433
DB_DATABASE=EmergencyAppDB
DB_USER=sa
DB_PASSWORD=your_password
```

Start the backend:

```bash
npm run dev
```
