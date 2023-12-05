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

export const types = [
  {
    value: "procedure",
    label: "Procédure",
  },
  {
    value: "informative",
    label: "Informatif",
  },
  {
    value: "maintenance",
    label: "Maintenance",
  },
];

export const companies = [
  {
    value: "all",
    label: "Toutes",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "nicoll",
    label: "Nicoll",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "girpi",
    label: "Girpi",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "aliaxis",
    label: "Aliaxis",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "aui",
    label: "AUI",
    icon: QuestionMarkCircledIcon,
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

// export const priorities = [
//   {
//     label: "Basse",
//     value: "low",
//     icon: ArrowDownIcon,
//   },
//   {
//     label: "Moyenne",
//     value: "medium",
//     icon: ArrowRightIcon,
//   },
//   {
//     label: "Haute",
//     value: "high",
//     icon: ArrowUpIcon,
//   },
// ];

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
];
