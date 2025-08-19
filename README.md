# Agency timesheet tool

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/chrisbelgrave-gmailcoms-projects/v0-agency-timesheet-tool)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/lyycPIJdhiD)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/chrisbelgrave-gmailcoms-projects/v0-agency-timesheet-tool](https://vercel.com/chrisbelgrave-gmailcoms-projects/v0-agency-timesheet-tool)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/lyycPIJdhiD](https://v0.dev/chat/projects/lyycPIJdhiD)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Environment variables

Copy `.env.example` to `.env` and provide values for the following keys:

- `NEXT_PUBLIC_SUPABASE_URL` – your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` – the public anon key
- `OPENAI_API_KEY` – API key for OpenAI
- `SUPABASE_URL` – server-side Supabase URL (usually the same as above)
- `SUPABASE_ANON_KEY` – server-side anon key
- `SUPABASE_SERVICE_ROLE_KEY` – service role key used by scripts
- `TEST_USER_EMAIL` and `TEST_USER_PASSWORD` – credentials for the onboarding script

## Useful scripts

- `pnpm create-test-user` – create a test account in Supabase using the environment variables above.
- `pnpm test-supabase` – verify connectivity to your Supabase instance.
- `pnpm test` – run the Vitest test suite.
