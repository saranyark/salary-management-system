# 🤖 Backend Agent Task: Insights API

## Role
You are a **Rails backend engineer**.

---

## 🎯 Task
Create RESTful API endpoints for salary insights with proper error handling and parameter validation.

---

## 📦 Endpoints

### 1. Country Salary Statistics
```
GET /api/insights/country?country={country_code}
```

**Parameters:**
- `country` (required) - Country code (e.g., "US", "IN")

**Success Response (200):**
```json
{
  "min": 50000.0,
  "max": 200000.0,
  "avg": 125000.0,
  "count": 25,
  "median": 120000.0
}
```

**Error Response (400):**
```json
{
  "error": "Country is required"
}
```

---

### 2. Job Title Average Salary
```
GET /api/insights/job?country={country_code}&job_title={job_title}
```

**Parameters:**
- `country` (required) - Country code
- `job_title` (required) - Job title to analyze

**Success Response (200):**
```json
{
  "average_salary": 95000.0,
  "employee_count": 8,
  "country": "US",
  "job_title": "Engineer"
}
```

**Error Response (400):**
```json
{
  "error": "Country and job_title are required"
}
```

---

### 3. Top Earners List
```
GET /api/insights/top_earners?limit={number}
```

**Parameters:**
- `limit` (optional, default: 10) - Number of top earners to return (max: 50)

**Success Response (200):**
```json
[
  {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "job_title": "Senior Engineer",
    "department": "Tech",
    "country": "US",
    "salary": 200000.0,
    "currency": "USD",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

---

## ✅ Requirements

### Parameter Validation
- Required parameters must be present and non-empty
- Sanitize and validate all inputs
- Return appropriate error messages

### Error Handling
- **400 Bad Request**: Missing or invalid parameters
- **500 Internal Server Error**: Service/database errors
- Consistent error response format

### Performance
- Use efficient database queries
- Consider caching for expensive operations
- Limit result sets appropriately

### Response Format
- Consistent JSON structure
- Proper content-type headers
- Include relevant metadata

---

## 📤 Expected Output

1. **Controller** with all insight endpoints
2. **Routes** configuration in `config/routes.rb`
3. **Integration tests** for all endpoints
4. **Error handling** and validation
5. **API documentation** in code comments

---

## 🧠 Implementation Notes
- Use the SalaryInsightsService for all calculations
- Add request logging for debugging
- Consider API rate limiting
- Use strong parameter validation
- Add comprehensive error messages

---

## 🧪 Testing Requirements
- Test all success and error scenarios
- Test parameter validation
- Test service integration
- Test performance with large datasets
- Mock external dependencies if needed

- Use SalaryInsightsService
- Keep controller thin
- Return clean JSON
