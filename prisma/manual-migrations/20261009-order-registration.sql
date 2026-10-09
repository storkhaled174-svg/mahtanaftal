-- REVIEW ONLY. Existing database provider/schema must be verified first.
-- Applicable only to MySQL. Back up and inspect SHOW CREATE TABLE TireOrder.
-- No UPDATE/DELETE/TRUNCATE/DROP COLUMN; existing row values are preserved.
-- Execute only statements needed by the actual schema, ONCE.

-- Only if submissionKey is missing:
ALTER TABLE TireOrder ADD COLUMN submissionKey VARCHAR(36) NULL;
-- Only if this unique index is missing:
CREATE UNIQUE INDEX TireOrder_submissionKey_key ON TireOrder(submissionKey);
-- Only if registrationDate is missing; historical records retain NULL and
-- the application displays their existing createdAt as a fallback:
ALTER TABLE TireOrder ADD COLUMN registrationDate DATE NULL;

-- Keep legacy payment columns, preserving their existing values, but permit
-- new orders to OMIT them (NULL). Do not narrow or overwrite legacy data.
ALTER TABLE TireOrder MODIFY dahabiaCardNumber VARCHAR(64) NULL DEFAULT NULL;
ALTER TABLE TireOrder MODIFY dahabiaExpiry VARCHAR(16) NULL DEFAULT NULL;
-- If the previous last-eight CHECK exists and does not allow NULL, the operator
-- must review and remove ONLY that named CHECK; never delete data or columns.
-- MySQL 8 syntax, execute ONLY if this CHECK exists:
-- ALTER TABLE TireOrder DROP CHECK TireOrder_card_last8_check;
