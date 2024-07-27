import {
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { DropdownLogo } from "./DropdownLogo";
import { Key } from "react";
import { AdminTableDropdownType, Ticket } from "../lib/definitions";
export function AdminTableDropdown({
  chipValue,
  ticket,
  tickets,
  setTickets,
}: AdminTableDropdownType) {
  const statusColorMap: Record<string, ChipProps["color"]> = {
    resolved: "success",
    new: "danger",
    progress: "warning",
  };

  const onChangeStatus = async (key: Key, id: String) => {
    var status = String(key);
    await fetch("/api/ticket", {
      method: "PUT",
      body: JSON.stringify({
        status: status,
        id: id,
      }),
    });
    var ticketsTemp: Ticket[] = tickets;
    ticketsTemp.forEach((ticket) => {
      if (ticket.id === id) {
        ticket.status = status;
      }
    });
    setTickets(tickets);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button endContent={<DropdownLogo />}>
          <Chip
            className="capitalize "
            color={statusColorMap[chipValue]}
            size="sm"
            variant="flat">
            {chipValue}
          </Chip>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disabledKeys={[chipValue]}
        onAction={(key: Key) => onChangeStatus(key, ticket.id)}>
        <DropdownItem key="new" textValue="new">
          <Chip
            className="capitalize"
            color={statusColorMap["new"]}
            size="sm"
            variant="flat">
            {"new"}
          </Chip>
        </DropdownItem>
        <DropdownItem key="progress" textValue="progress">
          <Chip
            className="capitalize"
            color={statusColorMap["progress"]}
            size="sm"
            variant="flat">
            {"progress"}
          </Chip>
        </DropdownItem>
        <DropdownItem key="resolved" textValue="resolved">
          <Chip
            className="capitalize"
            color={statusColorMap["resolved"]}
            size="sm"
            variant="flat">
            {"resolved"}
          </Chip>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
