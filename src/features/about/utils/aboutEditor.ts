import { AboutBlock, AboutBlockType, AboutFormValues, AboutPage } from "../types/about";

const createDataByType = (type: AboutBlockType): Record<string, unknown> => {
  switch (type) {
    case "hero":
      return {
        availability: "",
        eyebrow: "",
        highlights: [""],
        imageAlt: "",
        imageUrl: "",
        location: "",
        primaryCtaLabel: "",
        primaryCtaUrl: "",
        secondaryCtaLabel: "",
        secondaryCtaUrl: "",
        subtitle: "",
        summary: "",
        title: "",
      };
    case "text":
      return {
        body: "",
        title: "",
        variant: "default",
      };
    case "image":
      return {
        alt: "",
        caption: "",
        layout: "wide",
        title: "",
        url: "",
      };
    case "stack":
      return {
        description: "",
        groups: [{ items: [""], title: "" }],
        title: "",
      };
    case "social":
      return {
        description: "",
        items: [{ handle: "", iconUrl: "", label: "", url: "" }],
        title: "",
      };
    case "contact":
      return {
        description: "",
        items: [{ label: "", note: "", url: "", value: "" }],
        title: "",
      };
    case "contact-form":
      return {
        description: "",
        emailLabel: "",
        messageLabel: "",
        nameLabel: "",
        subjectLabel: "",
        submitLabel: "",
        successMessage: "",
        title: "",
      };
    default:
      return {};
  }
};

export const createEmptyAboutBlock = (type: AboutBlockType): AboutBlock => ({
  data: createDataByType(type),
  id: crypto.randomUUID(),
  type,
});

export const createEmptyAboutForm = (): AboutFormValues => ({
  blocks: [createEmptyAboutBlock("hero"), createEmptyAboutBlock("text")],
  seoDescription: "",
  seoTitle: "",
});

export const mapAboutToFormValues = (page: AboutPage): AboutFormValues => ({
  blocks: page.blocks.map((block) => ({
    data: block.data,
    id: block.id,
    type: block.type,
  })),
  seoDescription: page.seoDescription || "",
  seoTitle: page.seoTitle || "",
});
