import { Button } from "@/components/ui/button";
import { Step, StepConfig, Steps } from "@/components/ui/stepper";
import { useStepper } from "@/components/ui/use-stepper";
import { Input } from "@/components/ui/input";

import { Editor } from "@tinymce/tinymce-react";
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
import {
  AlertOctagon,
  Building,
  Building2,
  Castle,
  GanttChart,
  Info,
  PartyPopper,
  Wrench,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { SheetFormSchema } from "@/types/schemas";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { categories, subcategories, categoryTypes } from "@/data/sheets";

const steps = [
  { label: "Etape 1", description: "Titre" },
  { label: "Etape 2", description: "Procédure" },
  { label: "Etape 3", description: "Qualification" },
  { label: "Etape 4", description: "Publication" },
  { label: "Etape 5", description: "Autres" },
] satisfies StepConfig[];

interface StepperSheetCreationProps {
  setTitle: (title: string) => void;
}

export default function StepperSheetCreation({
  setTitle,
}: StepperSheetCreationProps) {
  const [id, setId] = useState("");
  const [subcategoriesDisabled, setSubcategoriesDisabled] =
    useState<boolean>(true);
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

  const handleEditorChange = (content: any, editor: any) => {
    // console.log("Content was updated:", content.level.content);
    form.setValue("description", content.level.content);
  };
  const handleCategoryChange = (value: string) => {
    form.resetField("subcategory");
    if (value !== undefined) {
      form.setValue("category", value);
      setSubcategoriesDisabled(false);
      return;
    }
    setSubcategoriesDisabled(true);
  };

  const initial = `<p>This is the initial content of the editor.</p><h1><span style="color: rgb(53, 152, 219);" data-mce-style="color: rgb(53, 152, 219);"><strong>Hello</strong></span></h1>`;

  const form = useForm<z.infer<typeof SheetFormSchema>>({
    resolver: zodResolver(SheetFormSchema),
  });

  const { mutate: addSheet, isLoading: isCreating } = trpc.addSheet.useMutation(
    {
      onSuccess: (data) => {
        toast({
          title: "Fiche créée",
        });
        setId(data.id);
        setTitle(data.title);
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
                              <Input
                                placeholder="Création de compte, exploitation WMS Girpi, ..."
                                {...field}
                              />
                            </FormControl>
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
                            Informations concernant la fiche.
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
                                <Input {...field} />
                              </FormControl>
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
                                <Editor
                                  apiKey="tvro04mz48z6wrzc4ek5xa4akpxfcq4qge4c39td4w5j96rm"
                                  init={{
                                    height: 500,
                                    menubar: true,
                                    plugins: [
                                      "advlist",
                                      "autolink",
                                      "lists",
                                      "link",
                                      "image",
                                      "charmap",
                                      "anchor",
                                      "searchreplace",
                                      "visualblocks",
                                      "code",
                                      "fullscreen",
                                      "insertdatetime",
                                      "media",
                                      "table",
                                      "preview",
                                      "help",
                                      "wordcount",
                                    ],
                                    formats: {
                                      h1: {
                                        block: "h1",
                                        attributes: {
                                          class:
                                            "text-3xl font-bold tracking-tight",
                                        },
                                      },
                                      h2: {
                                        block: "h2",
                                        attributes: {
                                          class:
                                            "text-2xl font-bold tracking-tight",
                                        },
                                      },
                                      h3: {
                                        block: "h3",
                                        attributes: {
                                          class:
                                            "text-xl font-bold tracking-tight",
                                        },
                                      },
                                      h4: {
                                        block: "h4",
                                        attributes: {
                                          class:
                                            "text-lg font-bold tracking-tight",
                                        },
                                      },
                                    },
                                    toolbar:
                                      "undo redo | blocks | " +
                                      "bold italic forecolor | alignleft aligncenter " +
                                      "alignright alignjustify | bullist numlist outdent indent | " +
                                      "removeformat | help",
                                    content_style:
                                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                  }}
                                  onChange={handleEditorChange}
                                />
                              </FormControl>
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
                                  5Mo maximum / pj
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
                            Catégorisation (ServiceNow)
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
                                <Select
                                  onValueChange={handleCategoryChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionner ..." />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {categories.map((category) => (
                                      <SelectItem
                                        key={category.id}
                                        value={category.value}
                                      >
                                        <div className="flex items-center space-x-2">
                                          <category.icon className="w-4 h-4" />
                                          <span>{category.label}</span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
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
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  disabled={subcategoriesDisabled}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionner ..." />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {subcategories
                                      .filter(
                                        (sb) =>
                                          sb.category ===
                                          form.getValues("category")
                                      )
                                      .map((subcategory) => (
                                        <SelectItem
                                          key={subcategory.id}
                                          value={subcategory.value}
                                        >
                                          <div className="flex items-center space-x-2">
                                            <subcategory.icon className="w-4 h-4" />
                                            <span>{subcategory.label}</span>
                                          </div>
                                        </SelectItem>
                                      ))}
                                  </SelectContent>
                                </Select>
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
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionner ..." />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {categoryTypes.map((categoryType) => (
                                      <SelectItem
                                        key={categoryType.id}
                                        value={categoryType.value}
                                      >
                                        <div className="flex items-center space-x-2">
                                          <categoryType.icon className="w-4 h-4" />
                                          <span>{categoryType.label}</span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
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
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionner ..." />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="critical">
                                      <div className="flex items-center space-x-2">
                                        <AlertOctagon className="w-4 h-4 text-red-500" />
                                        <span>Critique</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="high">
                                      <div className="flex items-center space-x-2">
                                        <AlertOctagon className="w-4 h-4 text-orange-500" />
                                        <span>Haute</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="medium">
                                      <div className="flex items-center space-x-2">
                                        <AlertOctagon className="w-4 h-4 text-yellow-500" />
                                        <span>Moyenne</span>
                                      </div>
                                    </SelectItem>
                                    <SelectItem value="low">
                                      <div className="flex items-center space-x-2">
                                        <AlertOctagon className="w-4 h-4 text-gray-500" />
                                        <span>Basse</span>
                                      </div>
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
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
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionner ..." />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectLabel>Applicatif</SelectLabel>
                                      <SelectItem value="FR_APP_L2">
                                        FR_APP_L2
                                      </SelectItem>
                                      <SelectItem value="FR_APP_L3">
                                        FR_APP_L3
                                      </SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                      <SelectLabel>Proximité</SelectLabel>
                                      <SelectItem value="FR_EUT_L2">
                                        FR_EUT_L2
                                      </SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                      <SelectLabel>Infrastructure</SelectLabel>
                                      <SelectItem value="EMA_DC_L2">
                                        EMA_DC_L2
                                      </SelectItem>
                                    </SelectGroup>
                                    <SelectGroup>
                                      <SelectLabel>Réseau</SelectLabel>
                                      <SelectItem value="EMA_NS_L2">
                                        EMA_NS_L2
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
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
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Publier ma procédure
                              </FormLabel>
                              <FormDescription>
                                Vous pouvez publier votre procédure dès sa
                                création ou bien le faire plus tard.
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                aria-readonly
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  {activeStep === 4 && (
                    <div className="mt-4 flex flex-col space-y-6">
                      <h1 className="font-bold text-xl">{step.description}</h1>
                      <div className="flex flex-col space-y-4">
                        <div>
                          <h3 className="text-lg font-medium">Type de fiche</h3>
                          <p className="text-sm text-muted-foreground">
                            {`Quelle sera l'utilité de cette fiche ?`}
                          </p>
                        </div>
                        <Separator />
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Type</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner ..." />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="procedure">
                                    <div className="flex items-center space-x-2">
                                      <GanttChart className="w-4 h-4" />
                                      <span>Procédure</span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="maintenance">
                                    <div className="flex items-center space-x-2">
                                      <Wrench className="w-4 h-4" />
                                      <span>Maintenance</span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="informative">
                                    <div className="flex items-center space-x-2">
                                      <Info className="w-4 h-4" />
                                      <span>Informatif</span>
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col space-y-4">
                        <div>
                          <h3 className="text-lg font-medium">Société</h3>
                          <p className="text-sm text-muted-foreground">
                            Quelle(s) société(s) cette fiche fait référence ?
                          </p>
                        </div>
                        <Separator />
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Société</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner ..." />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="all">
                                    <div className="flex items-center space-x-2">
                                      <Building2 className="w-4 h-4" />
                                      <span>Toutes</span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="aliaxis">
                                    <div className="flex items-center space-x-2 text-blue-500">
                                      <Castle className="w-4 h-4" />
                                      <span>Aliaxis</span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="nicoll">
                                    <div className="flex items-center space-x-2 text-red-500">
                                      <Building className="w-4 h-4" />
                                      <span>Nicoll</span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="girpi">
                                    <div className="flex items-center space-x-2 text-orange-500">
                                      <Building className="w-4 h-4" />
                                      <span>Girpi</span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="aui">
                                    <div className="flex items-center space-x-2 text-purple-500">
                                      <Building className="w-4 h-4" />
                                      <span>AUI</span>
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
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
                    Accéder à ma fiche
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm italic">
                {isLastStep
                  ? `Pour terminer votre procédure, cliquez sur "Terminer".`
                  : `Pour enregistrer vos modifications, cliquez sur "Suivant".`}
              </span>
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
