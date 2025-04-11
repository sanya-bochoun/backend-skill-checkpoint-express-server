# API Documentation

## 📝 Questions API

### Create Question
```http
POST /questions
```
**Request Body:**
```json
{
  "title": "What is the capital of France?",
  "description": "This is a basic geography question asking about the capital city of France.",
  "category": "Geography"
}
```
**Response:**
- Success (201 Created)
```json
{
  "message": "Question created successfully."
}
```
- Error (400 Bad Request)
```json
{
  "message": "Invalid request data."
}
```

### Get All Questions
```http
GET /questions
```
**Response:**
- Success (200 OK)
```json
{
  "data": [
    {
      "id": 1,
      "title": "What is the capital of France?",
      "description": "This is a basic geography question asking about the capital city of France.",
      "category": "Geography"
    }
  ]
}
```
- Error (500 Internal Server Error)
```json
{
  "message": "Unable to fetch questions."
}
```

### Get Question by ID
```http
GET /questions/:questionId
```
**Response:**
- Success (200 OK)
```json
{
  "data": {
    "id": 1,
    "title": "What is the capital of France?",
    "description": "This is a basic geography question asking about the capital city of France.",
    "category": "Geography"
  }
}
```
- Error (404 Not Found)
```json
{
  "message": "Question not found."
}
```

### Update Question
```http
PUT /questions/:questionId
```
**Request Body:**
```json
{
  "title": "What is the capital of Germany?",
  "description": "Updated question asking about the capital city of Germany.",
  "category": "Geography"
}
```
**Response:**
- Success (200 OK)
```json
{
  "message": "Question updated successfully."
}
```
- Error (404 Not Found)
```json
{
  "message": "Question not found."
}
```

### Delete Question
```http
DELETE /questions/:questionId
```
**Response:**
- Success (200 OK)
```json
{
  "message": "Question post has been deleted successfully."
}
```
- Error (404 Not Found)
```json
{
  "message": "Question not found."
}
```

### Search Questions
```http
GET /questions/search
```
**Query Parameters:**
- `title`: Search by title
- `category`: Search by category

**Response:**
- Success (200 OK)
```json
{
  "data": [
    {
      "id": 1,
      "title": "What is the capital of France?",
      "description": "This is a basic geography question asking about the capital city of France.",
      "category": "Geography"
    }
  ]
}
```
- Error (400 Bad Request)
```json
{
  "message": "Invalid search parameters."
}
```

## 💬 Answers API

### Create Answer
```http
POST /questions/:questionId/answers
```
**Request Body:**
```json
{
  "content": "The capital of France is Paris."
}
```
**Response:**
- Success (201 Created)
```json
{
  "message": "Answer created successfully."
}
```
- Error (404 Not Found)
```json
{
  "message": "Question not found."
}
```

### Get Answers
```http
GET /questions/:questionId/answers
```
**Response:**
- Success (200 OK)
```json
{
  "data": [
    {
      "id": 1,
      "content": "The capital of France is Paris."
    }
  ]
}
```
- Error (404 Not Found)
```json
{
  "message": "Question not found."
}
```

### Delete Answers
```http
DELETE /questions/:questionId/answers
```
**Response:**
- Success (200 OK)
```json
{
  "message": "All answers for the question have been deleted successfully."
}
```
- Error (404 Not Found)
```json
{
  "message": "Question not found."
}
```

## 👍 Voting API

### Vote Question
```http
POST /questions/:questionId/vote
```
**Request Body:**
```json
{
  "vote": 1  // 1 for upvote, -1 for downvote
}
```
**Response:**
- Success (200 OK)
```json
{
  "message": "Vote on the question has been recorded successfully."
}
```
- Error (400 Bad Request)
```json
{
  "message": "Invalid vote value."
}
``` 