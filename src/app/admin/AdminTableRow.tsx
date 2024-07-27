import { Button, TableCell } from "@nextui-org/react";
import { AdminTableRowType, Ticket } from "../lib/definitions";
import React from "react";
import { AdminTableDropdown } from "./AdminTableDropdown";

export function AdminTableRow({
  item,
  columnKey,
  setSelectedTicket,
  setTickets,
  tickets,
  onOpen,
}: AdminTableRowType) {
  const renderCell = React.useCallback(
    (ticket: Ticket, columnKey: React.Key) => {
      const cellValue = ticket[columnKey as keyof Ticket];
      switch (columnKey) {
        case "name":
          return <p className="text-bold text-sm">{cellValue}</p>;
        case "email":
          return <p className="text-bold text-sm">{cellValue}</p>;
        case "description":
          return <p className="text-xs">{cellValue}</p>;
        case "status":
          var chipValue = cellValue;
          return (
            <AdminTableDropdown
              chipValue={chipValue}
              ticket={ticket}
              tickets={tickets}
              setTickets={setTickets}
            />
          );
        case "details":
          return (
            <>
              <Button
                size="sm"
                onPress={() => {
                  onOpen();
                  setSelectedTicket(ticket);
                }}>
                Details
              </Button>
            </>
          );
      }
    },
    [onOpen]
  );

  return <>{renderCell(item, columnKey)}</>;
}
