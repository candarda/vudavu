/*
  # Initial Schema Setup

  1. New Tables
    - `submissions`
      - Stores form submissions with user information
    - `banks`
      - Stores available bank options
    - `admin_users`
      - Stores admin credentials

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for data access
*/

-- Create banks table
CREATE TABLE IF NOT EXISTS banks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  password text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text NOT NULL,
  bank_id uuid REFERENCES banks(id),
  created_at timestamptz DEFAULT now()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE banks ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read active banks" ON banks
  FOR SELECT USING (active = true);

CREATE POLICY "Only admins can manage banks" ON banks
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));

CREATE POLICY "Only admins can view submissions" ON submissions
  FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM admin_users WHERE admin_users.id = auth.uid()));

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (email, password)
VALUES ('admin@example.com', 'admin123');

-- Insert some default banks
INSERT INTO banks (name) VALUES
  ('Bank A'),
  ('Bank B'),
  ('Bank C'),
  ('Bank D');