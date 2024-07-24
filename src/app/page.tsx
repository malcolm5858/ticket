"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { formDataType } from "./lib/definitions";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState<formDataType>({
    name: "",
    email: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState<formDataType>({
    name: "",
    email: "",
    description: "",
  });

  const onCloseModal = () => {
    setFormData({
      name: "",
      email: "",
      description: "",
    });
  };

  const handleFormUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const checkForErrorsOrSubmit = async (event: React.SyntheticEvent) => {
    var errors: formDataType = {
      name: "",
      email: "",
      description: "",
    };
    event.preventDefault();
    if (
      !String(formData.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      errors = {
        ...errors,
        email: "Not a valid Email",
      };
    }
    if (formData.name === "") {
      errors = {
        ...errors,
        name: "Please enter full name",
      };
    }
    if (formData.email === "") {
      errors = {
        ...errors,
        email: "Please email",
      };
    }
    if (formData.description === "") {
      errors = {
        ...errors,
        description: "Please enter description",
      };
    }
    if (
      errors.name === "" &&
      errors.email === "" &&
      errors.description === ""
    ) {
      //Submit Form
      console.log(formData);
      const response = await fetch("/api/ticket", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          description: formData.description,
        }),
      });
      onOpen();
    }
    setFormErrors(errors);
  };
  const itemSize = "lg";
  return (
    <div className="h-screen overflow-hidden">
      <Link href="/admin" className="flex justify-end p-2">
        <Button color="danger">Admin</Button>
      </Link>
      <div className="w-full flex flex-col gap-10 items-center justify-center h-full">
        <h1 className="text-5xl">Submit Ticket</h1>
        <form
          className="flex flex-col w-1/4 gap-4"
          onSubmit={checkForErrorsOrSubmit}>
          <Input
            name="name"
            size={itemSize}
            type="text"
            label="Full Name"
            variant="bordered"
            isInvalid={formErrors.name !== ""}
            errorMessage={formErrors.name}
            value={formData.name}
            onChange={handleFormUpdate}
          />
          <Input
            name="email"
            size={itemSize}
            type="email"
            label="Email Address"
            variant="bordered"
            isInvalid={formErrors.email !== ""}
            errorMessage={formErrors.email}
            value={formData.email}
            onChange={handleFormUpdate}
          />
          <Textarea
            name="description"
            size={itemSize}
            label="Description"
            variant="bordered"
            isInvalid={formErrors.description !== ""}
            errorMessage={formErrors.description}
            value={formData.description}
            onChange={handleFormUpdate}
          />
          <Button type="submit" color="primary">
            Submit
          </Button>
        </form>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onCloseModal}>
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
    </div>
  );
}
