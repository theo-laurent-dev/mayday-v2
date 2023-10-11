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
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { SheetFormSchema } from "@/types/forms";

const steps = [
  { label: "Etape 1", description: "Titre" },
  { label: "Etape 2", description: "Procédure" },
  { label: "Etape 3", description: "Qualification" },
  { label: "Etape 4", description: "Publication" },
  { label: "Etape 5", description: "Autres" },
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

  const form = useForm<z.infer<typeof SheetFormSchema>>({
    resolver: zodResolver(SheetFormSchema),
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

  function onSubmit(data: z.infer<typeof SheetFormSchema>) {
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
                    <div className="mt-4 flex flex-col space-y-6">
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
                              Titre de votre procédure.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  {activeStep === 1 && (
                    <div className="mt-4 flex flex-col space-y-6">
                      <h1 className="font-bold text-xl">{step.description}</h1>
                      <div className="flex flex-col space-y-4">
                        <div>
                          <h3 className="text-lg font-medium">Description</h3>
                          <p className="text-sm text-muted-foreground">
                            Informations concernant la procédure.
                          </p>
                        </div>
                        <Separator />
                        <FormField
                          control={form.control}
                          name="shortDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description courte</FormLabel>
                              <FormControl>
                                <Input placeholder="shadcn" {...field} />
                              </FormControl>
                              <FormDescription>
                                Brève description de la procédure.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  rows={10}
                                  placeholder="shadcn"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Toutes les étapes de la procédure.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col space-y-4">
                        <div>
                          <h3 className="text-lg font-medium">
                            Pièces-jointes
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Liste des pièces-jointes rattachées.
                          </p>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="assignmentGroup"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Pièces-jointes</FormLabel>
                                <FormControl>
                                  <Input type="file" {...field} />
                                </FormControl>
                                <FormDescription>
                                  {`Correspond au groue d'assignation ServiceNow.`}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {activeStep === 2 && (
                    <div className="mt-4 flex flex-col space-y-6">
                      <h1 className="font-bold text-xl">{step.description}</h1>
                      <div className="flex flex-col space-y-4">
                        <div>
                          <h3 className="text-lg font-medium">
                            Catégorisation
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Comment catégoriseriez-vous les tickets ?
                          </p>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-2 gap-4">
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
                                  Correspond à la catégorie ServiceNow.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="subcategory"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Sous-Catégorie</FormLabel>
                                <FormControl>
                                  <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Correspond à la sous-catégorie ServiceNow.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="categoryType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Type de catégorie</FormLabel>
                                <FormControl>
                                  <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Correspond au type de catégorie ServiceNow.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col space-y-4">
                        <div>
                          <h3 className="text-lg font-medium">Impact</h3>
                          <p className="text-sm text-muted-foreground">
                            Quel impact ?
                          </p>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="criticity"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Criticité</FormLabel>
                                <FormControl>
                                  <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                  Correspond à la criticité ServiceNow.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col space-y-4">
                        <div>
                          <h3 className="text-lg font-medium">Escalade</h3>
                          <p className="text-sm text-muted-foreground">
                            A quel groupe les tickets doivent-ils être escaladés
                            ?
                          </p>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="assignmentGroup"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{`Groupe d'assignation`}</FormLabel>
                                <FormControl>
                                  <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                  {`Correspond au groue d'assignation ServiceNow.`}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {activeStep === 3 && (
                    <div className="mt-4 flex flex-col space-y-6">
                      <h1 className="font-bold text-xl">{step.description}</h1>
                      <FormField
                        control={form.control}
                        name="published"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Publier ma procédure</FormLabel>
                              <FormDescription>
                                Vous pouvez la publier plus tard en modifiant la
                                procédure.
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  {activeStep === 4 && (
                    <div className="mt-4 flex flex-col space-y-6">
                      <h1 className="font-bold text-xl">{step.description}</h1>
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type de procédure</FormLabel>
                            <FormControl>
                              <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                              Maintenance, procédure, ...
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
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
                  {isLastStep
                    ? "Terminer"
                    : isOptionalStep
                    ? "Passer"
                    : "Suivant"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
