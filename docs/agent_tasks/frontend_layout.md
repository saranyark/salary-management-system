# 🧠 Frontend Agent Task: UI Layout & Architecture Design

## Role
You are a **Frontend Architect + UX Designer**.

---

## Task
Design a **modern, scalable UI architecture** for a Salary Management System used by an HR Manager.

---

## 🎯 Objective
Create a clean, premium, and intuitive interface that allows:
- Managing employees
- Viewing salary insights
- Navigating easily between features

---

## 🧩 Core Pages

### 1. Dashboard
- Overview of key metrics:
  - Total Employees
  - Average Salary
  - Highest Salary
- Visual charts:
  - Salary distribution
  - Country-wise salary

---

### 2. Employee Management
- Table view:
  - List employees
  - Pagination
- Features:
  - Search (name/email)
  - Filters (country, job title)
  - Add / Edit (modal form)
  - Delete (confirmation dialog)

---

### 3. Insights Page
- Filters:
  - Country dropdown
  - Job Title input
- Metrics:
  - Min / Max / Avg salary (cards)
- Visualizations:
  - Bar chart (salary by job title)
- Table:
  - Top earners

---

## 🏗️ Layout Structure

```text
App Layout
│
├── Sidebar (Navigation)
│     ├── Dashboard
│     ├── Employees
│     └── Insights
│
├── Topbar
│     └── App title / user info
│
└── Main Content
      ├── Dashboard Page
      ├── Employees Page
      └── Insights Page