import {
  AlertOctagon,
  AppWindow,
  ArrowDownUp,
  Box,
  Database,
  File,
  GraduationCap,
  Grid,
  HelpCircle,
  Key,
  LayoutDashboard,
  Lock,
  Printer,
  Smartphone,
  TrendingUp,
  Wifi,
  XCircle,
} from "lucide-react";

export const categories = [
  {
    id: 1,
    label: "Téléphonie",
    value: "telephony",
    icon: Smartphone,
  },
  {
    id: 2,
    label: "Software",
    value: "software",
    icon: Box,
  },
  {
    id: 3,
    label: "Business Application",
    value: "businessApplication",
    icon: AppWindow,
  },
  {
    id: 4,
    label: "Hardware",
    value: "hardware",
    icon: Printer,
  },
  {
    id: 5,
    label: "Réseaux",
    value: "network",
    icon: Wifi,
  },
  {
    id: 6,
    label: "Base de données",
    value: "database",
    icon: Database,
  },
  {
    id: 7,
    label: "Sécurité",
    value: "security",
    icon: Key,
  },
  {
    id: 8,
    label: "Accès",
    value: "userAccess",
    icon: Lock,
  },
];

export const subcategories = [
  {
    id: 1,
    category: "database",
    label: "Cubes",
    value: "cubes",
    icon: Box,
  },
  {
    id: 2,
    category: "hardware",
    label: "Imprimante",
    value: "printer",
    icon: Printer,
  },
  {
    id: 3,
    category: "businessApplication",
    label: "ERP",
    value: "erp",
    icon: LayoutDashboard,
  },
  {
    id: 4,
    category: "software",
    label: "Excel",
    value: "excel",
    icon: Grid,
  },
];

export const categoryTypes = [
  {
    id: 1,
    label: "Accès",
    value: "access",
    icon: Lock,
  },
  {
    id: 2,
    label: "Données",
    value: "data",
    icon: ArrowDownUp,
  },
  {
    id: 3,
    label: "Erreur",
    value: "error",
    icon: XCircle,
  },
  {
    id: 4,
    label: "Incident",
    value: "issue",
    icon: AlertOctagon,
  },
  {
    id: 5,
    label: "Autre",
    value: "other",
    icon: HelpCircle,
  },
  {
    id: 6,
    label: "Performances",
    value: "performances",
    icon: TrendingUp,
  },
  {
    id: 7,
    label: "Licence",
    value: "licence",
    icon: File,
  },
  {
    id: 8,
    label: "Entrainement",
    value: "training",
    icon: GraduationCap,
  },
];
