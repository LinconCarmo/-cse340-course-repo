-- Migration to ensure organization table has description, contact_email, and logo columns
-- Run this after setup.sql to add any missing columns

BEGIN;

-- Add description column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'organization' 
        AND column_name = 'description'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.organization ADD COLUMN description TEXT NOT NULL DEFAULT '';
    END IF;
END $$;

-- Add contact_email column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'organization' 
        AND column_name = 'contact_email'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.organization ADD COLUMN contact_email VARCHAR(255) NOT NULL DEFAULT '';
    END IF;
END $$;

-- Add logo column if it doesn't exist (feedback mentions "logo" not "logo_filename")
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'organization' 
        AND column_name = 'logo'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.organization ADD COLUMN logo VARCHAR(255) NOT NULL DEFAULT '';
    END IF;
END $$;

-- If logo_filename exists but logo doesn't, copy data from logo_filename to logo
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'organization' 
        AND column_name = 'logo_filename'
        AND table_schema = 'public'
    ) AND EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'organization' 
        AND column_name = 'logo'
        AND table_schema = 'public'
    ) THEN
        UPDATE public.organization SET logo = logo_filename WHERE logo = '';
    END IF;
END $$;

COMMIT;