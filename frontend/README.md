# Book Explorer — React Frontend (Vite)

This is a React conversion of your HTML Book Explorer. It calls the same backend API.

## Quick start
```bash
npm install
npm run dev
```

The app expects the backend at `http://localhost:5000/api/books` by default.

## Configuration
You can override defaults with a `.env` file in the project root:

```bash
# .env
VITE_API_URL=http://localhost:5000/api/books
VITE_PAGE_LIMIT=5
```

## Notes
- Pagination and UI match your original page.
- Shows loading and basic error state.
- If you hit CORS issues, enable CORS on your backend or use a proxy.
