export type AboutBlockType =
  | "contact"
  | "contact-form"
  | "hero"
  | "image"
  | "social"
  | "stack"
  | "text";

export interface AboutBlock {
  data: Record<string, unknown>;
  id: string;
  type: AboutBlockType;
}

export interface AboutPage {
  blocks: AboutBlock[];
  createdAt: string;
  id: string;
  seoDescription: string | null;
  seoTitle: string | null;
  updatedAt: string;
}

export interface AboutFormValues {
  blocks: AboutBlock[];
  seoDescription: string;
  seoTitle: string;
}
