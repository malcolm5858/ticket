"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { formDataType } from "./lib/definitions";
import HomePageModal from "./HomePageModal";
import { HomePageForm } from "./HomePageForm";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="h-screen overflow-hidden">
      <Link href="/admin" className="flex justify-end p-2">
        <Button color="danger">Admin</Button>
      </Link>
      <div className="w-full flex flex-col gap-10 items-center justify-center h-full">
        <h1 className="text-5xl">Submit Ticket</h1>
        <HomePageForm onOpen={onOpen} />
      </div>
      <HomePageModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
