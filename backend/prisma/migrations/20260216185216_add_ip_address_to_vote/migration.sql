/*
  Warnings:

  - A unique constraint covering the columns `[pollId,ipAddress]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "ipAddress" TEXT NOT NULL DEFAULT '0.0.0.0';

-- CreateIndex
CREATE UNIQUE INDEX "Vote_pollId_ipAddress_key" ON "Vote"("pollId", "ipAddress");
