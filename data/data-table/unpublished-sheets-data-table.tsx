import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { Building, Building2, GanttChart, Info, Wrench } from "lucide-react";

export const types = [
  {
    value: "procedure",
    label: "Procédure",
    icon: GanttChart,
  },
  {
    value: "informative",
    label: "Informatif",
    icon: Info,
  },
  {
    value: "maintenance",
    label: "Maintenance",
    icon: Wrench,
  },
];

export const companies = [
  {
    value: "all",
    label: "Toutes",
    icon: Building2,
  },
  {
    value: "nicoll",
    label: "Nicoll",
    icon: Building,
  },
  {
    value: "girpi",
    label: "Girpi",
    icon: Building,
  },
  {
    value: "aliaxis",
    label: "Aliaxis",
    icon: Building,
  },
  {
    value: "aui",
    label: "AUI",
    icon: Building,
  },
];

export const columnsLabels = [
  {
    value: "title",
    label: "Titre",
  },
  {
    value: "company",
    label: "Société",
  },
  {
    value: "criticity",
    label: "Criticité",
  },
  {
    value: "type",
    label: "Type",
  },
  {
    value: "userId",
    label: "Utilisateur",
  },
  {
    value: "category",
    label: "Catégorie",
  },
  {
    value: "subcategory",
    label: "Sous-catégorie",
  },
];

export const criticities = [
  {
    label: "Basse",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Moyenne",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "Haute",
    value: "high",
    icon: ArrowUpIcon,
  },
  {
    label: "Critique",
    value: "critical",
    icon: ArrowUpIcon,
  },
];

// export const labels = [
//   {
//     value: "bug",
//     label: "Bug",
//   },
//   {
//     value: "feature",
//     label: "Feature",
//   },
//   {
//     value: "documentation",
//     label: "Documentation",
//   },
// ];

// export const statuses = [
//   {
//     value: "backlog",
//     label: "Backlog",
//     icon: QuestionMarkCircledIcon,
//   },
//   {
//     value: "todo",
//     label: "Todo",
//     icon: CircleIcon,
//   },
//   {
//     value: "in progress",
//     label: "In Progress",
//     icon: StopwatchIcon,
//   },
//   {
//     value: "done",
//     label: "Done",
//     icon: CheckCircledIcon,
//   },
//   {
//     value: "canceled",
//     label: "Canceled",
//     icon: CrossCircledIcon,
//   },
// ];
