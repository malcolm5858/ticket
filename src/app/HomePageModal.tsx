import React from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { HomePageModalTypes } from "./lib/definitions";

export default function HomePageModal({
  isOpen,
  onOpenChange,
}: HomePageModalTypes) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">Success</ModalHeader>
            <ModalBody>
              <br />
              <h1>Ticket Logged</h1>
              <br />
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
