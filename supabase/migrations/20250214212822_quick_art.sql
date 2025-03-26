/*
  # Initial Schema Setup for Auto Garage Management System

  1. New Tables
    - users
      - Customer information and authentication
    - vehicles
      - Vehicle information linked to users
    - services
      - Available service types and pricing
    - appointments
      - Service appointments and scheduling
    - reviews
      - Customer reviews and ratings

  2. Security
    - Enable RLS on all tables
    - Add policies for data access control
*/

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create vehicles table
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  vin TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  duration INTEGER NOT NULL, -- Duration in minutes
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create appointments table
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  vehicle_id UUID REFERENCES vehicles(id),
  service_id UUID REFERENCES services(id),
  appointment_date TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can view their own vehicles"
  ON vehicles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view services"
  ON services
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their own appointments"
  ON appointments
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create appointments"
  ON appointments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can view reviews"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create reviews"
  ON reviews
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Insert some initial services
INSERT INTO services (name, description, price, duration) VALUES
  ('Oil Change', 'Full synthetic oil change with filter replacement', 79.99, 45),
  ('Brake Service', 'Brake pad replacement and rotor inspection', 249.99, 120),
  ('Tire Rotation', 'Tire rotation and balance', 49.99, 45),
  ('Engine Diagnostic', 'Complete engine diagnostic scan', 89.99, 60),
  ('AC Service', 'AC system check and recharge', 129.99, 90);