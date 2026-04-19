Act as Backend Agent (Senior Rails API Engineer).

Implement a production-ready EmployeesController.

Requirements:

1. Endpoints:
- index (with pagination and filters: country, job_title)
- show
- create
- update
- destroy

2. Pagination:
- Use page and per_page params
- Return metadata (page, total count)

3. Filtering:
- Apply filters using model scopes

4. JSON Response:
- Structure response as:
  {
    data: [...],
    meta: { page, total }
  }

5. Error Handling:
- Handle record not found
- Handle validation errors
- Return proper HTTP status codes

6. Code Quality:
- Use before_action
- Use strong params
- Keep code clean and readable

Output:
- Full EmployeesController code