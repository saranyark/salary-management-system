# 🧠 Analytics Agent Task: Salary Insights Service

## Role
You are a **data analytics engineer** specializing in backend systems.

---

## Task
Design and implement a **Salary Insights Service** to compute key salary metrics efficiently for an organization with 10,000 employees.

---

## Functional Requirements

### 1. Country Salary Stats
- Input: `country`
- Output:
  - Minimum salary
  - Maximum salary
  - Average salary

---

### 2. Job Title Salary Stats (within a country)
- Input:
  - `country`
  - `job_title`
- Output:
  - Average salary

---

### 3. Top Earners
- Output:
  - Top 10 employees with highest salary

---

### 4. Salary Distribution
- Output:
  - Average salary grouped by `job_title`

---

## Non-Functional Requirements

- Must handle 10,000+ records efficiently
- Use database-level aggregation (NOT Ruby loops)
- Avoid N+1 queries
- Optimize for read performance

---

## Implementation Strategy

- Use ActiveRecord aggregation methods:
  - `minimum`
  - `maximum`
  - `average`
  - `group`
- Encapsulate logic in a **service class**
- Keep controller thin (delegates to service)

---

## Expected Output

1. Service file:
   - `app/services/salary_insights_service.rb`
2. Clean and reusable methods
3. Optimized queries

---

## Method Design

### Methods to Implement:

- `country_stats(country)`
- `job_title_stats(country, job_title)`
- `top_earners(limit = 10)`
- `salary_distribution`

---

## Testing Requirements

- Unit tests for each method
- Validate aggregation correctness
- Edge cases:
  - empty dataset
  - invalid inputs
  - null values