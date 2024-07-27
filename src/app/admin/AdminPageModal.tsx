import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { AdminPageModalType } from "../lib/definitions";

export function AdminPageModal({
  selectedTicket,
  isOpen,
  onOpenChange,
}: AdminPageModalType) {
  const [updateMessage, setUpdateMessage] = useState("");
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      scrollBehavior="inside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Details</ModalHeader>
            <ModalBody>
              <h2>{"Name: " + selectedTicket?.name}</h2>
              <h2>{"Email: " + selectedTicket?.email}</h2>
              <p>{"Description: " + selectedTicket?.description}</p>
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
  );
}
