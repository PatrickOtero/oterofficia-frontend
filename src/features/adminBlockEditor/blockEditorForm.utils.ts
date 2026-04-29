export type EditableBlock = {
    data: Record<string, unknown>;
};

export const updateBlockData = <TBlock extends EditableBlock>(
    blocks: TBlock[],
    blockIndex: number,
    dataKey: string,
    value: unknown
): TBlock[] =>
    blocks.map((block, index) =>
        index === blockIndex
            ? {
                  ...block,
                  data: {
                      ...block.data,
                      [dataKey]: value,
                  },
              }
            : block
    );

export const moveItem = <TItem>(
    items: TItem[],
    itemIndex: number,
    direction: -1 | 1
): TItem[] => {
    const nextIndex = itemIndex + direction;

    if (nextIndex < 0 || nextIndex >= items.length) {
        return items;
    }

    const reorderedItems = [...items];
    [reorderedItems[itemIndex], reorderedItems[nextIndex]] = [
        reorderedItems[nextIndex],
        reorderedItems[itemIndex],
    ];

    return reorderedItems;
};

export const removeItem = <TItem>(items: TItem[], itemIndex: number): TItem[] =>
    items.filter((_, index) => index !== itemIndex);

export const toRecordArray = (value: unknown): Array<Record<string, unknown>> =>
    Array.isArray(value)
        ? value.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object"))
        : [];
