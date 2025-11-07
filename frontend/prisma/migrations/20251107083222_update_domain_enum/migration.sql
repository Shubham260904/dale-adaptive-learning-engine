/*
  Warnings:

  - The values [DYNAMIC_PROGRAMMING] on the enum `Domain` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Domain_new" AS ENUM ('ARRAY', 'STRING', 'BIT_MANIPULATION', 'LINKED_LIST', 'STACK_QUEUE', 'BINARY_SEARCH', 'BST', 'GRAPH', 'UNION_FIND', 'RECURSION', 'DP', 'OOPS', 'OS', 'DBMS', 'HR', 'SYS_DESIGN');
ALTER TABLE "DomainRating" ALTER COLUMN "domain" TYPE "Domain_new" USING ("domain"::text::"Domain_new");
ALTER TABLE "Question" ALTER COLUMN "domain" TYPE "Domain_new" USING ("domain"::text::"Domain_new");
ALTER TABLE "RatingHistory" ALTER COLUMN "domain" TYPE "Domain_new" USING ("domain"::text::"Domain_new");
ALTER TYPE "Domain" RENAME TO "Domain_old";
ALTER TYPE "Domain_new" RENAME TO "Domain";
DROP TYPE "public"."Domain_old";
COMMIT;
