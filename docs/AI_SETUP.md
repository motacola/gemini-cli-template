# AI Integration Setup for Natural Language Timesheet Entry

This document provides instructions and information about setting up and understanding the AI integration used for processing natural language timesheet entries.

## 1. Environment Variable: `GEMINI_API_KEY`

To enable the AI-powered natural language processing for timesheet entries, you must configure the `GEMINI_API_KEY` environment variable.

*   **Purpose:** This API key is used to authenticate requests to the Google Gemini API, which processes your text input and suggests structured timesheet data.
*   **How to Obtain an API Key:**
    1.  Visit [Google AI Studio](https://aistudio.google.com/).
    2.  You might need to sign in with your Google account.
    3.  Create a new project or use an existing one.
    4.  Navigate to the "API Keys" or similar section and generate a new API key.
    5.  **Important:** Treat this key like a password. Do not share it publicly or commit it to version control.
*   **Local Development Setup:**
    1.  Create a file named `.env.local` in the root directory of your project (if it doesn't already exist).
    2.  Add the following line to your `.env.local` file, replacing `YOUR_GEMINI_API_KEY` with the key you obtained:
        ```
        GEMINI_API_KEY=YOUR_GEMINI_API_KEY
        ```
    3.  This file is typically ignored by Git (via `.gitignore`), so your key will remain private.
*   **Deployment Environment Setup:**
    *   For platforms like Vercel, Netlify, AWS Amplify, etc., you will need to set the `GEMINI_API_KEY` as an environment variable within your project's settings on that platform. Refer to your deployment provider's documentation for specific instructions on how to set environment variables.

## 2. AI Model Used

*   **Model:** The system currently uses `gemini-1.5-flash-latest`.
*   **Reason for Choice:** This model was chosen for its strong capabilities in understanding natural language, its ability to follow complex instructions (like generating JSON), its relatively large context window, and its efficiency, making it suitable for this application. It also often has a generous free tier or cost-effective pricing for development and testing.

## 3. Task Type Classification

The AI attempts to classify the type of task based on your input description. This is captured in the `task_type` field.

*   **Example Categories:** While the AI can infer a variety of tasks, common examples guided by the internal prompt include:
    *   Development
    *   Meeting
    *   Design
    *   Admin
    *   Testing
    *   Research
    *   Documentation
*   **Database Schema for `task_type`:**
    *   **Important:** To store the `task_type` persistently in your timesheet entries, you may need to update your Supabase database schema.
    *   Check your `timesheet_entries` table. If it does not have a column for `task_type`, you should add one. A common way to do this via SQL in the Supabase SQL Editor is:
        ```sql
        ALTER TABLE timesheet_entries
        ADD COLUMN task_type TEXT NULL;
        ```
    *   Without this database modification, the `task_type` suggested by the AI will be processed by the frontend but will not be saved when the timesheet entry is submitted.

## 4. Clarification Flow

If your input is ambiguous (e.g., you mention a project name that matches multiple entries in the database, or the details are too vague), the AI is designed to ask for clarification.

*   The user interface will then present you with the AI's question and any relevant options (e.g., a list of projects to choose from).
*   Once you provide the clarification, the system will re-process your original input along with your selection to generate a more accurate timesheet entry.

## 5. Troubleshooting

*   **Error: "AI service not configured. Missing API key."**
    *   **Cause:** The `GEMINI_API_KEY` environment variable is not set or not accessible by the application.
    *   **Solution:** Ensure the API key is correctly set in your `.env.local` file (for local development) or in your deployment environment's settings.
*   **Error: "Failed to process input" / "AI returned invalid data format." / "AI failed to provide a response."**
    *   **Cause:** These are general errors that can occur if:
        *   The Gemini API is temporarily unavailable.
        *   The API key is invalid or has exceeded its quota.
        *   The AI model could not understand the input well enough to produce valid structured data, despite the prompt engineering.
        *   There's an unexpected issue with the AI service.
    *   **Solution:**
        *   Check your API key and its status in Google AI Studio.
        *   Try rephrasing your input to be more specific.
        *   If the issue persists, check the application logs for more details.
*   **Error: "AI could not determine the project."**
    *   **Cause:** The AI could not confidently identify a project from your input, and it didn't trigger the clarification flow as expected (or the clarification was insufficient).
    *   **Solution:** Try making your input more specific regarding the project name or job number. If a pre-selected project was intended, ensure it was correctly passed from the frontend.

---

For further assistance, please consult the application logs or contact the development team.
