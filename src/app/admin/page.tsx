"use client";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Ticket } from "../lib/definitions";
import { AdminPageModal } from "./AdminPageModal";
import { AdminTableRow } from "./AdminTableRow";
const columns = [
  { name: "Name", id: "name" },
  { name: "Status", id: "status" },
  { name: "Details", id: "details" },
];

export default function Admin() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket>({
    id: "",
    name: "",
    email: "",
    description: "",
    status: "",
  });
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    async function fetchData() {
      await fetch("/api/ticket")
        .then((response) => response.json())
        .then((data) => setTickets(data));
    }
    fetchData();
  }, [tickets]);

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
                <TableCell>
                  <AdminTableRow
                    item={item}
                    columnKey={columnKey}
                    setSelectedTicket={setSelectedTicket}
                    setTickets={setTickets}
                    tickets={tickets}
                    onOpen={onOpen}
                  />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AdminPageModal
        selectedTicket={selectedTicket}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
