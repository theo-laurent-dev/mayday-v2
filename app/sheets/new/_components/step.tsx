"use client";

import { Button } from "@/components/ui/button";
import { Step, StepConfig, Steps } from "@/components/ui/stepper";
import { useStepper } from "@/components/ui/use-stepper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/app/_trpc/client";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { PartyPopper } from "lucide-react";

const steps = [
  { label: "Etape 1", description: "Titre" },
  { label: "Etape 2", description: "Description" },
  { label: "Etape 3", description: "Qualification" },
  //   { label: "Etape 4", description: "Publication" },
] satisfies StepConfig[];

export default function StepperSheetCreation() {
  const [id, setId] = useState("");
  const {
    nextStep,
    prevStep,
    resetSteps,
    activeStep,
    isDisabledStep,
    isLastStep,
    isOptionalStep,
  } = useStepper({
    initialStep: 0,
    steps,
  });

  const FormSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z
      .string()
      .min(2, {
        message: "Description must be at least 2 characters.",
      })
      .optional(),
    category: z
      .string()
      .min(2, {
        message: "Category must be at least 2 characters.",
      })
      .optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate: addSheet, isLoading: isCreating } = trpc.addSheet.useMutation(
    {
      onSuccess: (data) => {
        toast({
          title: "Procédure créée",
        });
        setId(data.id);
        nextStep();
      },
    }
  );

  const { mutate: updateSheet, isLoading: isUpdating } =
    trpc.updateSheet.useMutation({
      onSuccess: (data) => {
        toast({
          title: "Modifications enregistrées",
        });
        nextStep();
      },
    });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (isDisabledStep && id === "") {
      addSheet({ ...data });
    }
    if (!isDisabledStep || id !== "") {
      updateSheet({ ...data, id });
    }
  }

  return (
    <div className="flex w-full flex-col gap-4 mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Steps activeStep={activeStep}>
            {steps.map((step, index) => (
              <Step index={index} key={index} {...step}>
                <div className="w-full p-4 text-slate-900 dark:bg-slate-300">
                  {activeStep === 0 && (
                    <>
                      <h1 className="font-bold text-xl">{step.description}</h1>
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Titre</FormLabel>
                            <FormControl>
                              <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                              This is the public display name.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  {activeStep === 1 && (
                    <>
                      <h1 className="font-bold text-xl">{step.description}</h1>
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Titre</FormLabel>
                            <FormControl>
                              <Textarea
                                rows={10}
                                placeholder="shadcn"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              This is the public display name.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  {activeStep === 2 && (
                    <>
                      <h1 className="font-bold text-xl">{step.description}</h1>
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Catégorie</FormLabel>
                            <FormControl>
                              <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                              This is the public display name.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  {/* {activeStep === 3 && (
                    <>
                      <h1 className="font-bold text-xl">{step.description}</h1>
                      <div>
                        <Label htmlFor="status">Etat</Label>
                        <Input
                          id="status"
                          placeholder="Publiée, brouillon, ..."
                        />
                      </div>
                    </>
                  )} */}
                </div>
              </Step>
            ))}
          </Steps>
          {activeStep === steps.length ? (
            <div className="flex items-center justify-center mt-6">
              <div className="flex flex-col text-center space-y-4">
                <h2 className="text-2xl flex items-center justify-center">
                  <PartyPopper className="hidden sm:block sm:mr-2" />{" "}
                  Félicitations !
                  <PartyPopper className="hidden sm:block sm:ml-2" />
                </h2>
                <span className="text-gray-400">
                  Vous avez complété toutes les étapes.
                </span>
                <Link href={`/sheets/${id}`}>
                  <Button type="button" variant="secondary">
                    Accéder à ma procédure
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm italic">{`Pour enregistrer vos modifications, cliquez sur "Suivant".`}</span>
              <div className="flex items-center space-x-2">
                <Button
                  disabled={isDisabledStep || isUpdating}
                  onClick={prevStep}
                  type="button"
                >
                  Précédent
                </Button>

                <Button type="submit" disabled={isCreating || isUpdating}>
                  {isOptionalStep ? "Passer" : "Suivant"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
