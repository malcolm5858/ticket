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
} from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Ticket } from "../lib/definitions";
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

  useEffect(() => {
    async function fetchData() {
      await fetch("/api/ticket")
        .then((response) => response.json())
        .then((data) => setTickets(data));
    }
    fetchData();
  }, []);

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
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[cellValue]}
              size="sm"
              variant="flat">
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <>
              <Button
                size="sm"
                onPress={() => {
                  onOpen();
                  setSelectedTicket(ticket);
                  console.log(ticket.name);
                }}>
                Edit
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
                Edit Ticket
              </ModalHeader>
              <ModalBody>{selectedTicket?.name}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
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
