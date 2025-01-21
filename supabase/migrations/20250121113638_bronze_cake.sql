/*
  # Update submissions table policies

  1. Changes
    - Add policy to allow inserting new submissions for anonymous users
    
  2. Security
    - Maintains existing RLS policies
    - Adds new policy for submission inserts
*/

-- Add policy to allow anonymous submissions
CREATE POLICY "Anyone can submit form data" ON submissions
  FOR INSERT
  WITH CHECK (true);