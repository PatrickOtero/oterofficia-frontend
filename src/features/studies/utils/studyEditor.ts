import { StudyBlock, StudyBlockType, StudyDetail, StudyFormValues } from "../types/study";

const createDataByType = (type: StudyBlockType): Record<string, unknown> => {
  switch (type) {
    case "heading":
      return { level: "2", text: "" };
    case "paragraph":
      return { text: "" };
    case "image":
      return { alt: "", caption: "", url: "" };
    case "code":
      return { caption: "", code: "", language: "text" };
    case "quote":
      return { author: "", text: "" };
    case "list":
      return { items: [""], style: "unordered" };
    case "divider":
      return { spacing: "md" };
    case "callout":
      return { text: "", title: "", variant: "note" };
    case "references":
      return { links: [{ description: "", label: "", url: "" }] };
    default:
      return {};
  }
};

export const createEmptyBlock = (type: StudyBlockType): StudyBlock => ({
  data: createDataByType(type),
  type,
});

export const createEmptyStudyForm = (): StudyFormValues => ({
  category: "",
  content: [createEmptyBlock("paragraph")],
  coverImage: "",
  excerpt: "",
  seoDescription: "",
  seoTitle: "",
  slug: "",
  status: "draft",
  tags: [],
  title: "",
});

export const mapStudyToFormValues = (study: StudyDetail): StudyFormValues => ({
  category: study.category,
  content: study.content.map((block) => ({
    data: block.data,
    id: block.id,
    position: block.position,
    type: block.type,
  })),
  coverImage: study.coverImage || "",
  excerpt: study.excerpt,
  readingTime: study.readingTime,
  seoDescription: study.seoDescription || "",
  seoTitle: study.seoTitle || "",
  slug: study.slug,
  status: study.status,
  tags: study.tags,
  title: study.title,
});

export const parseTagsInput = (value: string) =>
  value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

export const formatTagsInput = (tags: string[]) => tags.join(", ");
