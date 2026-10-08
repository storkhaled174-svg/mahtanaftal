-- Run once against the existing MySQL database after a verified backup.
-- Irreversibly discard all but the last 8 card digits before narrowing the column.
UPDATE TireOrder SET dahabiaCardNumber = RIGHT(dahabiaCardNumber, 8);
ALTER TABLE TireOrder MODIFY dahabiaCardNumber VARCHAR(8) NOT NULL;
ALTER TABLE TireOrder ADD COLUMN submissionKey VARCHAR(36) NULL;
CREATE UNIQUE INDEX TireOrder_submissionKey_key ON TireOrder(submissionKey);
-- MySQL 8.0.16+: enforce numeric last-eight values for all writers.
-- Inspect/fix any legacy values shorter than 8 digits before adding this constraint.
ALTER TABLE TireOrder ADD CONSTRAINT TireOrder_card_last8_check
  CHECK (dahabiaCardNumber REGEXP '^[0-9]{8}$');
