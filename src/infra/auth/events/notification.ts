import { PrismaClient, shipmentRole } from "@prisma/client";
import { Shipment } from "../core/shipment";
import { sendNotification } from "./send-notification";

const prisma = new PrismaClient();

async function updateShipmentStatus(
  shipmentId: string,
  newStatus: shipmentRole,
) {
  try {
    const shipment = await prisma.shipment.update({
      where: { id: shipmentId },
      data: { status: newStatus },
      include: { Recipient: true },
    });

    await sendNotification(shipment.recipientId, newStatus);
  } catch (error) {
    console.error(
      "Erro ao atualizar o status da remessa ou enviar a notificação:",
      error,
    );
  }
}
