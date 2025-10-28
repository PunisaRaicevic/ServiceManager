-- =====================================================
-- DODAJ LOCATION POLJA ZA APPLIANCES
-- =====================================================
-- Ovo dodaje tri nova polja: Grad, Objekat, Prostorija
-- =====================================================

ALTER TABLE appliances 
ADD COLUMN IF NOT EXISTS appliance_city VARCHAR,
ADD COLUMN IF NOT EXISTS appliance_building VARCHAR,
ADD COLUMN IF NOT EXISTS appliance_room VARCHAR;

-- Provera rezultata
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'appliances' 
  AND column_name IN ('appliance_city', 'appliance_building', 'appliance_room');
