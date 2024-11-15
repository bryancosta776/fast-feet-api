/*
  Warnings:

  - You are about to drop the column `Cpf` on the `Recipient` table. All the data in the column will be lost.
  - Added the required column `cpf` to the `Recipient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipient" DROP COLUMN "Cpf",
ADD COLUMN     "cpf" TEXT NOT NULL;
