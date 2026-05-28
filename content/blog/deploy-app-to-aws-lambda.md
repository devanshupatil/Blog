---
title: Deploy a Node.js App to AWS Lambda in 15 Minutes
description: A step-by-step guide to deploying a serverless Node.js function on AWS Lambda with API Gateway — from zero to a live public URL.
category: Cloud
published: true
createdAt: 2025-05-14T09:00:00.000Z
image: /assets/lambda-vpc.webp
author: Devanshu Patil
authorTitle: Software Developer
readingTime: 6 min read
tags: ['cloud']
proficiency: Beginner
---

Serverless functions let you run backend code without managing servers. AWS Lambda is the most widely used platform for this. Here's how to deploy a Node.js app in under 15 minutes.

## Prerequisites

- AWS account (free tier works fine)
- Node.js installed locally
- AWS CLI configured (`aws configure`)

## Step 1: Write Your Lambda Function

```js
// index.mjs
export const handler = async (event) => {
  const name = event.queryStringParameters?.name ?? 'World'

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: `Hello, ${name}!` }),
  }
}
```

## Step 2: Package It

```bash
zip function.zip index.mjs
```

If you have dependencies:
```bash
npm install
zip -r function.zip index.mjs node_modules/
```

## Step 3: Create the Lambda Function

```bash
aws lambda create-function \
  --function-name hello-api \
  --runtime nodejs20.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-basic-role \
  --handler index.handler \
  --zip-file fileb://function.zip
```

> **Note:** You need an IAM role with `AWSLambdaBasicExecutionRole` attached. Create one in the IAM console first.

## Step 4: Add API Gateway

```bash
# Create HTTP API
aws apigatewayv2 create-api \
  --name hello-http-api \
  --protocol-type HTTP \
  --target arn:aws:lambda:us-east-1:YOUR_ACCOUNT_ID:function:hello-api
```

AWS creates a public URL like `https://abc123.execute-api.us-east-1.amazonaws.com/`.

## Step 5: Test It

```bash
curl "https://abc123.execute-api.us-east-1.amazonaws.com/?name=Devanshu"
# {"message":"Hello, Devanshu!"}
```

## Update the Function

When you change code:

```bash
zip function.zip index.mjs
aws lambda update-function-code \
  --function-name hello-api \
  --zip-file fileb://function.zip
```

## Key Takeaways

- Lambda charges per invocation + duration — the free tier gives you 1M requests/month
- Cold starts are real but rarely matter for low-traffic APIs
- For production: use AWS SAM or SST for infrastructure-as-code instead of raw CLI commands
- Set a **concurrency limit** to avoid runaway billing

Lambda is perfect for infrequent workloads, webhooks, and scheduled jobs. Start here, graduate to ECS when you need persistent connections.
