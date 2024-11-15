/*
  Warnings:

  - Added the required column `pictureId` to the `Shipment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_shipmentId_fkey";

-- AlterTable
ALTER TABLE "Shipment" ADD COLUMN     "pictureId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_pictureId_fkey" FOREIGN KEY ("pictureId") REFERENCES "Picture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
