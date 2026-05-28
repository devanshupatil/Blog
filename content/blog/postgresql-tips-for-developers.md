---
title: PostgreSQL Tips Every Backend Developer Should Know
description: Practical PostgreSQL techniques — window functions, indexes, EXPLAIN ANALYZE, JSON columns, and query optimisation patterns used in real production systems.
category: Backend
published: true
createdAt: 2025-05-18T09:00:00.000Z
image: /assets/google-console.webp
author: Devanshu Patil
authorTitle: Software Developer
readingTime: 8 min read
tags: ['backend']
proficiency: Intermediate
---

PostgreSQL is one of the most powerful open-source databases. Most developers only scratch the surface. Here are the techniques I wish I'd learned earlier.

## 1. Use EXPLAIN ANALYZE Before Optimising Anything

Never guess where slowness comes from. Always measure first.

```sql
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE user_id = 42
ORDER BY created_at DESC
LIMIT 10;
```

Look for **Seq Scan** on large tables — that's a signal you need an index. **Index Scan** means Postgres is already using one.

## 2. Partial Indexes — Index Only What You Query

Don't index the whole table when you only ever query a subset.

```sql
-- Only index unpaid orders (the ones you actually filter on)
CREATE INDEX idx_orders_unpaid
ON orders (created_at DESC)
WHERE status = 'unpaid';
```

Partial indexes are smaller, faster, and cheaper to maintain.

## 3. Window Functions — Avoid Self-Joins

Window functions compute values across rows related to the current row without collapsing them.

```sql
-- Get each user's most recent order alongside all their orders
SELECT
  id,
  user_id,
  amount,
  created_at,
  ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
FROM orders;
```

Filter `WHERE rn = 1` to get only the latest order per user — no subquery required.

## 4. JSONB Columns — Flexible Schema Without Chaos

```sql
-- Store arbitrary metadata
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  metadata JSONB
);

-- Index a specific JSON key
CREATE INDEX idx_products_brand
ON products ((metadata->>'brand'));

-- Query it
SELECT * FROM products
WHERE metadata->>'brand' = 'Nike';
```

JSONB is indexed, compressed, and queryable. Great for optional/variable fields.

## 5. Use CTEs for Readable Complex Queries

```sql
WITH
  active_users AS (
    SELECT id FROM users WHERE last_login > NOW() - INTERVAL '30 days'
  ),
  recent_orders AS (
    SELECT user_id, COUNT(*) AS order_count
    FROM orders
    WHERE user_id IN (SELECT id FROM active_users)
    GROUP BY user_id
  )
SELECT u.email, ro.order_count
FROM users u
JOIN recent_orders ro ON ro.user_id = u.id
ORDER BY ro.order_count DESC;
```

CTEs make complex queries readable and maintainable. They're not just for recursion.

## Key Takeaway

The biggest gains come from: measuring with `EXPLAIN ANALYZE`, adding the right indexes (including partial ones), and reaching for window functions instead of correlated subqueries. Master these and your queries will be an order of magnitude faster.
