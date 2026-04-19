# Backend Agent Task: Employee Model

## Role
You are a **Rails backend engineer**.

---

## Task
Create an `Employee` model with comprehensive validations and database schema.

---

Requirements:

1. Generate:
- Rails migration
- Employee model
- RSpec model tests

2. Fields:
- first_name:string
- last_name:string
- email:string (unique)
- job_title:string
- department:string
- country:string
- currency:string
- salary:decimal

3. Database:
- Add indexes on email (unique), country, job_title
- Add NOT NULL constraints
- Use proper data types (decimal for salary)

4. Validations:
- presence for all fields
- length minimum 2 for names, job_title, department, country
- email format validation
- email uniqueness
- salary must be numeric and > 0

5. Model Enhancements:
- Add scopes:
  - by_country
  - by_job_title
- Add method:
  full_name → returns "first_name last_name"

6. Tests:
- RSpec tests for all validations
- invalid email cases
- negative salary
- missing fields