# AI-Powered Medical Documentation System

## Overview

This project is an AI-powered medical documentation system designed to streamline the process of recording and managing patient interactions. The goal is to reduce the time doctors spend on documentation, allowing them to focus more on patient care. The system integrates voice-to-text transcription, text-based notes, document uploads, and intelligent search capabilities.

## Features

- **User Authentication**: Secure login system for doctors and medical staff.
- **Session Management**: Each patient interaction is stored in a session.
- **Voice-to-Text Transcription**: Converts recorded audio into text using AI-powered speech recognition.
- **Rich Documentation Support**: Doctors can add text notes, voice recordings, and uploaded documents.
- **Search & Retrieval**: Full-text search and vector search to find relevant patient records.
- **Real-Time Data Sync**: Optimized for fast and seamless updates.

## Tech Stack

- **Frontend**: Next.js (React) with Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **AI Services**: OpenAI / Vercel AI SDK
- **Storage**: Supabase Storage for voice recordings & documents

## Installation

### Prerequisites

- Node.js (Latest LTS)
- PostgreSQL database (Supabase recommended)
- API keys for OpenAI and/or Vercel AI SDK

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/zigavidmar/healthcare-assistant.git
   cd your-repo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file and add:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
   OPENAI_API_KEY=your-openai-key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

- **Login/Register**: Doctors can sign in securely.
- **Start a Session**: Each patient interaction starts a new session.
- **Add Documentation**:
  - Type text notes.
  - Record voice and transcribe it.
  - Upload files (e.g., PDFs, medical images).
- **Search & Retrieve**: Find past patient sessions quickly using full-text and vector search.

## API Endpoints

- `POST /api/voice-to-text` → Transcribes recorded audio.
