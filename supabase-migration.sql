-- SQL za dodavanje recurring tasks kolona u Supabase tasks tabelu
-- Izvršite ovaj SQL u Supabase SQL Editor-u

-- Dodajte priority kolonu
ALTER TABLE tasks 
ADD COLUMN IF NOT EXISTS priority text DEFAULT 'normal';

-- Dodajte recurrence kolone
ALTER TABLE tasks 
ADD COLUMN IF NOT EXISTS recurrence_pattern text DEFAULT 'none';

ALTER TABLE tasks 
ADD COLUMN IF NOT EXISTS recurrence_interval integer DEFAULT 1;

ALTER TABLE tasks 
ADD COLUMN IF NOT EXISTS parent_task_id varchar;

ALTER TABLE tasks 
ADD COLUMN IF NOT EXISTS is_auto_generated integer DEFAULT 0;

ALTER TABLE tasks 
ADD COLUMN IF NOT EXISTS next_occurrence_date date;

-- Dodajte foreign key constraint za parent_task_id
ALTER TABLE tasks
ADD CONSTRAINT tasks_parent_task_id_fkey 
FOREIGN KEY (parent_task_id) REFERENCES tasks(task_id) ON DELETE SET NULL;

-- Komentar za dokumentaciju
COMMENT ON COLUMN tasks.priority IS 'Task priority: low, normal, high';
COMMENT ON COLUMN tasks.recurrence_pattern IS 'Recurrence pattern: none, weekly, monthly, quarterly, semi-annual, yearly';
COMMENT ON COLUMN tasks.recurrence_interval IS 'Interval for recurrence (e.g., every 2 weeks, every 3 months)';
COMMENT ON COLUMN tasks.parent_task_id IS 'Reference to parent task for recurring task series';
COMMENT ON COLUMN tasks.is_auto_generated IS 'Flag indicating if task was auto-generated from recurring pattern (0=false, 1=true)';
COMMENT ON COLUMN tasks.next_occurrence_date IS 'Next date when recurring task should be generated';
