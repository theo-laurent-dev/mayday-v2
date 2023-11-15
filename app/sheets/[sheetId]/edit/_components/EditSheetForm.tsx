"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { trpc } from "@/app/_trpc/client";
import { Editor } from "@tinymce/tinymce-react";

import { useRouter } from "next/navigation";
import { SheetFormSchema } from "@/types/forms";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertOctagon,
  Building,
  Building2,
  Castle,
  GanttChart,
  Info,
  Wrench,
} from "lucide-react";
import { categories, categoryTypes, subcategories } from "@/data/sheets";
import { useState } from "react";

interface SheetEditPageProps {
  sheetId: string;
}

export default function SheetEditPage({ sheetId }: SheetEditPageProps) {
  const router = useRouter();
  const [subcategoriesDisabled, setSubcategoriesDisabled] =
    useState<boolean>(false);

  const { data: sheet, isLoading } = trpc.getSheet.useQuery({
    id: sheetId.toString(),
  });

  const form = useForm<z.infer<typeof SheetFormSchema>>({
    resolver: zodResolver(SheetFormSchema),
    defaultValues: {
      title: sheet?.title || "",
      shortDescription: sheet?.shortDescription || "",
      description: sheet?.description || "",
      category: sheet?.category || "",
      subcategory: sheet?.subcategory || "",
      categoryType: sheet?.categoryType || "",
      type: sheet?.type || "",
      criticity: sheet?.criticity || "",
      assignmentGroup: sheet?.assignmentGroup || "",
      company: sheet?.company || "",
    },
  });

  const { mutate: updateSheet, isLoading: isUpdating } =
    trpc.updateSheet.useMutation({
      onSuccess: (data) => {
        router.push(`/sheets/${data.id}`);
        toast({
          title: "Fiche modifiée",
          description: "Redirection vers la fiche ...",
        });
      },
    });

  const handleEditorChange = (content: any, editor: any) => {
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

  function onSubmit(data: z.infer<typeof SheetFormSchema>) {
    updateSheet({
      id: sheetId,
      ...data,
    });
  }

  if (isLoading) {
    return <div>Chargement</div>;
  }

  return (
    <div className="py-4 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl">{"Edition d'une fiche"}</h1>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            defaultValue={sheet?.title}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shortDescription"
            defaultValue={sheet?.shortDescription || ""}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description Courte</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
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
                    initialValue={form.getValues("description")}
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
                            class: "text-3xl font-bold tracking-tight",
                          },
                        },
                        h2: {
                          block: "h2",
                          attributes: {
                            class: "text-2xl font-bold tracking-tight",
                          },
                        },
                        h3: {
                          block: "h3",
                          attributes: {
                            class: "text-xl font-bold tracking-tight",
                          },
                        },
                        h4: {
                          block: "h4",
                          attributes: {
                            class: "text-lg font-bold tracking-tight",
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
                <FormDescription>
                  Toutes les étapes de la procédure.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      <SelectItem key={category.id} value={category.value}>
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
                <FormLabel>Sous-catégorie</FormLabel>
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
                        (sb) => sb.category === form.getValues("category")
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
                <FormDescription>
                  Criticité à saisir dans ServiceNow.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      <SelectItem value="FR_APP_L2">FR_APP_L2</SelectItem>
                      <SelectItem value="FR_APP_L3">FR_APP_L3</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Proximité</SelectLabel>
                      <SelectItem value="FR_EUT_L2">FR_EUT_L2</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Infrastructure</SelectLabel>
                      <SelectItem value="EMA_DC_L2">EMA_DC_L2</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Réseau</SelectLabel>
                      <SelectItem value="EMA_NS_L2">EMA_NS_L2</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Groupe à saisir dans ServiceNow.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="published"
            defaultValue={sheet?.published || false}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publié</FormLabel>
                <FormControl>
                  <Switch checked={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isUpdating}>
            Mettre à jour
          </Button>
        </form>
      </Form>
    </div>
  );
}
