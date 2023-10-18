export type sheet = {
  id: string;
  title: string;
  shortDescription: string | null;
  description: string | null;
  ref: string | null;
  type: string | null;
  category: string | null;
  subcategory: string | null;
  categoryType: string | null;
  criticity: string | null;
  assignmentGroup: string | null;
  businessApp: string | null;
  published: boolean | null;
  company: string | null;

  createdAt: string;
  updatedAt: string;

  userId: string;
};
