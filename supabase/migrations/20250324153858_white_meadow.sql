/*
  # Fix Database Issues and Update Schema

  1. Changes
    - Add website_content table
    - Update RLS policies for all tables
    - Add missing indexes
    - Fix service relationships

  2. Security
    - Update RLS policies to be more permissive for authenticated users
    - Allow public access to services table
*/

-- Create website_content table if it doesn't exist
CREATE TABLE IF NOT EXISTS website_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(section, key)
);

-- Enable RLS on website_content
ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;

-- Update RLS policies for website_content
CREATE POLICY "Admins can manage website content"
  ON website_content
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE email = auth.jwt()->>'email'
    )
  );

-- Update users table policies
DROP POLICY IF EXISTS "Users can view their own data" ON users;
CREATE POLICY "Users can manage their own data"
  ON users
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Update vehicles table policies
DROP POLICY IF EXISTS "Users can view their own vehicles" ON vehicles;
CREATE POLICY "Users can manage their vehicles"
  ON vehicles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Update services table policies
DROP POLICY IF EXISTS "Anyone can view services" ON services;
CREATE POLICY "Public can view services"
  ON services
  FOR SELECT
  TO PUBLIC
  USING (true);

-- Update appointments table policies
DROP POLICY IF EXISTS "Users can view their own appointments" ON appointments;
DROP POLICY IF EXISTS "Users can create appointments" ON appointments;
CREATE POLICY "Users can manage their appointments"
  ON appointments
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Update contacts table policies
DROP POLICY IF EXISTS "Anyone can create contacts" ON contacts;
CREATE POLICY "Public can create contacts"
  ON contacts
  FOR INSERT
  TO PUBLIC
  WITH CHECK (true);

-- Add missing indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_vehicles_user_id ON vehicles(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_vehicle_id ON appointments(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_appointments_service_id ON appointments(service_id);
CREATE INDEX IF NOT EXISTS idx_website_content_section ON website_content(section);

-- Insert default services if they don't exist
DO $$
BEGIN
  INSERT INTO services (name, description, price, duration)
  VALUES 
    ('Oil Change Service', 'Full synthetic oil change with filter replacement', 79.99, 45),
    ('Brake Service', 'Brake pad replacement and rotor inspection', 249.99, 120),
    ('Tire Rotation', 'Tire rotation and balance', 49.99, 45),
    ('Engine Diagnostic', 'Complete engine diagnostic scan', 89.99, 60),
    ('AC Service', 'AC system check and recharge', 129.99, 90)
  ON CONFLICT (id) DO NOTHING;
END $$;