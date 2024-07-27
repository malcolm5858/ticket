import { Dispatch, SetStateAction } from "react";
import { z, ZodType } from "zod";

export type Ticket = {
  id: string;
  name: string;
  email: string;
  description: string;
  status: string;
};

export type formDataType = {
  name: string;
  email: string;
  description: string;
};

export type HomePageModalTypes = {
  isOpen: boolean;
  onOpenChange: () => void;
};

export type HomePageFormTypes = {
  onOpen: () => void;
};

export const TicketSchema: ZodType<formDataType> = z.object({
  name: z.string().min(1, "Cant leave field empty"),
  email: z
    .string()
    .min(1, "Cant leave field empty")
    .email("Need to enter email"),
  description: z.string().min(1, "Cant leave field empty"),
});

export type AdminTableDropdownType = {
  chipValue: string;
  ticket: Ticket;
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
};

export type AdminTableRowType = {
  item: Ticket;
  columnKey: React.Key;
  setSelectedTicket: (ticket: Ticket) => void;
  setTickets: (tickets: Ticket[]) => void;
  tickets: Ticket[];
  onOpen: () => void;
};

export type AdminPageModalType = {
  selectedTicket: Ticket;
  isOpen: boolean;
  onOpenChange: () => void;
};
