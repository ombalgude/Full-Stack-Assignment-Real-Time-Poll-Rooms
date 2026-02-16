/*
  Warnings:

  - The primary key for the `Poll` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdById` on the `Poll` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Poll` table. All the data in the column will be lost.
  - The `id` column on the `Poll` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `adminId` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Room` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Vote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `votedAt` on the `Vote` table. All the data in the column will be lost.
  - The `id` column on the `Vote` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `PollOption` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,pollId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creatorId` to the `Poll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `pollId` on the `Vote` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `optionId` on the `Vote` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `Vote` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Poll" DROP CONSTRAINT "Poll_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Poll" DROP CONSTRAINT "Poll_roomId_fkey";

-- DropForeignKey
ALTER TABLE "PollOption" DROP CONSTRAINT "PollOption_pollId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_optionId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_pollId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_userId_fkey";

-- DropIndex
DROP INDEX "Poll_createdById_idx";

-- DropIndex
DROP INDEX "Poll_roomId_idx";

-- DropIndex
DROP INDEX "Room_slug_key";

-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "Vote_optionId_idx";

-- DropIndex
DROP INDEX "Vote_pollId_idx";

-- DropIndex
DROP INDEX "Vote_pollId_userId_key";

-- DropIndex
DROP INDEX "Vote_userId_idx";

-- AlterTable
ALTER TABLE "Poll" DROP CONSTRAINT "Poll_pkey",
DROP COLUMN "createdById",
DROP COLUMN "isActive",
ADD COLUMN     "creatorId" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Poll_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "adminId",
DROP COLUMN "slug",
ADD COLUMN     "creatorId" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Untitled Room';

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "username" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_pkey",
DROP COLUMN "votedAt",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "pollId",
ADD COLUMN     "pollId" INTEGER NOT NULL,
DROP COLUMN "optionId",
ADD COLUMN     "optionId" INTEGER NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Vote_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "PollOption";

-- CreateTable
CREATE TABLE "Option" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "pollId" INTEGER NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_pollId_key" ON "Vote"("userId", "pollId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poll" ADD CONSTRAINT "Poll_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "Poll"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
