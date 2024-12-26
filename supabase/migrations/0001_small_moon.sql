/*
  # Initial Schema Setup for CAIE CS Platform

  1. New Tables
    - users (extends auth.users)
      - user_id (uuid, primary key)
      - full_name (text)
      - role (enum: student, teacher, admin)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - courses
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - syllabus_section (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - progress
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - course_id (uuid, foreign key)
      - completed (boolean)
      - last_accessed (timestamp)
    
    - achievements
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - criteria (jsonb)
      - icon_url (text)

  2. Security
    - Enable RLS on all tables
    - Set up appropriate access policies
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role user_role DEFAULT 'student',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  syllabus_section TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create progress table
CREATE TABLE IF NOT EXISTS progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  last_accessed TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  criteria JSONB NOT NULL,
  icon_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin can view all users"
  ON users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

CREATE POLICY "Anyone can view courses"
  ON courses
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Teachers and admins can manage courses"
  ON courses
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE user_id = auth.uid()
      AND role IN ('teacher', 'admin')
    )
  );

CREATE POLICY "Users can view their own progress"
  ON progress
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON progress
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view achievements"
  ON achievements
  FOR SELECT
  TO authenticated
  USING (true);