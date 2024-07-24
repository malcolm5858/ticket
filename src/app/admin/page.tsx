"use client";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  ChipProps,
  Chip,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Textarea,
} from "@nextui-org/react";
import Link from "next/link";
import React, { Key, useEffect, useState } from "react";
import { Ticket } from "../lib/definitions";
import dropDownLogo from ".././../../public/dropdownLogo.svg";
import Image from "next/image";
const columns = [
  { name: "Name", id: "name" },
  { name: "Email", id: "email" },
  { name: "Description", id: "description" },
  { name: "Status", id: "status" },
  { name: "Actions", id: "actions" },
];

const statusColorMap: Record<string, ChipProps["color"]> = {
  resolved: "success",
  new: "danger",
  progress: "warning",
};

export default function Admin() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedTicket, setSelectedTicket] = useState<Ticket>();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [updateMessage, setUpdateMessage] = useState("");

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

  useEffect(() => {
    async function fetchData() {
      await fetch("/api/ticket")
        .then((response) => response.json())
        .then((data) => setTickets(data));
    }
    fetchData();
  }, [tickets]);

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
            <Dropdown>
              <DropdownTrigger>
                <div className="flex flex-row items-center">
                  <Chip
                    className="capitalize "
                    color={statusColorMap[chipValue]}
                    size="sm"
                    variant="flat">
                    {chipValue}
                  </Chip>

                  <Image className="h-15 w-10" src={dropDownLogo} alt="" />
                </div>
              </DropdownTrigger>
              <DropdownMenu
                disabledKeys={[chipValue]}
                onAction={(key: Key) => onChangeStatus(key, ticket.id)}>
                <DropdownItem key="new">
                  <Chip
                    className="capitalize"
                    color={statusColorMap["new"]}
                    size="sm"
                    variant="flat">
                    {"new"}
                  </Chip>
                </DropdownItem>
                <DropdownItem key="progress">
                  <Chip
                    className="capitalize"
                    color={statusColorMap["progress"]}
                    size="sm"
                    variant="flat">
                    {"progress"}
                  </Chip>
                </DropdownItem>
                <DropdownItem key="resolved">
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
        case "actions":
          return (
            <>
              <Button
                size="sm"
                onPress={() => {
                  onOpen();
                  setSelectedTicket(ticket);
                }}>
                Send Update
              </Button>
            </>
          );
      }
    },
    [onOpen]
  );

  return (
    <>
      <Link href="/" className="flex justify-end p-2">
        <Button color="danger">Home</Button>
      </Link>
      <Table aria-label="Table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.id} align="start">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={tickets} isLoading={tickets === null}>
          {(item: Ticket) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Send Update
              </ModalHeader>
              <ModalBody>
                <h2>{"Users Name: " + selectedTicket?.name}</h2>
                <Textarea
                  placeholder="Share Update"
                  value={updateMessage}
                  onChange={(e) => setUpdateMessage(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    console.log(
                      "Sent email to: " +
                        selectedTicket?.email +
                        " With the body: " +
                        updateMessage
                    );
                  }}>
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
