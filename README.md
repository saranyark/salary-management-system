# Salary Management System

A full-stack employee salary management application with a Ruby on Rails API backend and a Vite-powered React frontend.

## Project Structure

- `backend/api/` — Rails API application
- `frontend/vite-project/` — React frontend built with Vite
- `docs/` — project documentation and agent task notes

## Features

- Employee CRUD management
- Salary insights and analytics
- Dashboard overview with salary metrics
- Paginated employee listing
- Filter by country and job title

## Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend/api
   ```

2. Install Ruby dependencies:
   ```bash
   bundle install
   ```

3. Create and migrate the database:
   ```bash
   bin/rails db:create db:migrate
   ```

4. Seed the database (only if empty):
   ```bash
   bin/rails db:seed
   ```

5. Start the Rails server:
   ```bash
   bin/rails server -p 3000
   ```

The API will be available at `http://localhost:3000/api`.

## Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend/vite-project
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`.

## Notes

- The frontend proxy expects the backend to run on port `3000`.
- Seed data is preserved if the database already contains employees.
- The insights page fetches global data by default and applies filters when selected.

## Testing

### Backend

Run Rails service tests:
```bash
cd backend/api
bundle exec ruby -Itest test/services/salary_insights_service_test.rb
```
