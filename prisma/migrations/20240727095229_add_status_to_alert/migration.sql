-- CreateEnum
CREATE TYPE "status" AS ENUM ('report', 'completed');

-- AlterTable
ALTER TABLE "Alert" ADD COLUMN     "status" "status" NOT NULL DEFAULT 'report';
