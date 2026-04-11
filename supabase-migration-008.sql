-- Migration 008: Add beard column to avatars

ALTER TABLE avatars ADD COLUMN IF NOT EXISTS beard text NOT NULL DEFAULT 'none';
