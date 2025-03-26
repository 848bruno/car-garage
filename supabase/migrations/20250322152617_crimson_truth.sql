/*
  # Add admin authentication and contact form table

  1. New Tables
    - contacts
      - Store contact form submissions
    - admin_users
      - Store admin user emails for access control

  2. Security
    - Enable RLS on new tables
    - Add policies for data access
*/

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  email TEXT PRIMARY KEY
);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can view all contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = auth.jwt()->>'email'
    )
  );

CREATE POLICY "Anyone can create contacts"
  ON contacts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert admin user
INSERT INTO admin_users (email) VALUES ('admin@autocarepro.com');