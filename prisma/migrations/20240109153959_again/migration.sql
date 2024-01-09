-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "default" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "label" SET DEFAULT 'Default Address';

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "default" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "label" SET DEFAULT 'Default Contact';
