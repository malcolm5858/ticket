import { useState } from "react";
import {
  HomePageFormTypes,
  TicketSchema,
  formDataType,
} from "./lib/definitions";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function HomePageForm({ onOpen }: HomePageFormTypes) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formDataType>({ resolver: zodResolver(TicketSchema) });

  const itemSize = "lg";

  const submitForm = async (data: formDataType) => {
    //Submit Form
    console.log(data);
    await fetch("/api/ticket", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        description: data.description,
      }),
    });
    onOpen();
    reset();
  };

  return (
    <form
      className="flex flex-col w-80 gap-4"
      onSubmit={handleSubmit((data) => submitForm(data))}>
      <Input
        {...register("name")}
        size={itemSize}
        type="text"
        label="Full Name"
        variant="bordered"
        errorMessage={errors.name?.message}
        isInvalid={errors.name && true}
      />
      <Input
        {...register("email")}
        size={itemSize}
        type="email"
        label="Email Address"
        variant="bordered"
        errorMessage={errors.email?.message}
        isInvalid={errors.email && true}
      />
      <Textarea
        {...register("description")}
        size={itemSize}
        label="Description"
        variant="bordered"
        errorMessage={errors.description?.message}
        isInvalid={errors.description && true}
      />
      <Button type="submit" color="primary">
        Submit
      </Button>
    </form>
  );
}
