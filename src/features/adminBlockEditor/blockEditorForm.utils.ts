type BlockWithData = {
    data: Record<string, unknown>;
};

type BlockListKey<TForm> = {
    [Key in keyof TForm]: TForm[Key] extends BlockWithData[] ? Key : never;
}[keyof TForm];

type FormBlock<TForm, TKey extends BlockListKey<TForm>> =
    TForm[TKey] extends Array<infer TBlock extends BlockWithData> ? TBlock : never;

const getBlockList = <TForm, TKey extends BlockListKey<TForm>>(
    form: TForm,
    key: TKey
) => form[key] as FormBlock<TForm, TKey>[];

export const updateBlockAt = <
    TForm,
    TKey extends BlockListKey<TForm>
>(
    form: TForm,
    key: TKey,
    blockIndex: number,
    producer: (currentBlock: FormBlock<TForm, TKey>) => FormBlock<TForm, TKey>
): TForm => ({
    ...form,
    [key]: getBlockList(form, key).map((block, index) => (index === blockIndex ? producer(block) : block)),
});

export const updateBlockDataAt = <
    TForm,
    TKey extends BlockListKey<TForm>
>(
    form: TForm,
    key: TKey,
    blockIndex: number,
    dataKey: string,
    value: unknown
): TForm =>
    updateBlockAt(form, key, blockIndex, (block) => ({
        ...block,
        data: {
            ...block.data,
            [dataKey]: value,
        },
    }));

export const moveBlockAt = <
    TForm,
    TKey extends BlockListKey<TForm>
>(
    form: TForm,
    key: TKey,
    blockIndex: number,
    direction: -1 | 1
): TForm => {
    const blocks = [...getBlockList(form, key)];
    const nextIndex = blockIndex + direction;

    if (nextIndex < 0 || nextIndex >= blocks.length) {
        return form;
    }

    [blocks[blockIndex], blocks[nextIndex]] = [blocks[nextIndex], blocks[blockIndex]];

    return {
        ...form,
        [key]: blocks,
    };
};

export const removeBlockAt = <
    TForm,
    TKey extends BlockListKey<TForm>
>(
    form: TForm,
    key: TKey,
    blockIndex: number
): TForm => ({
    ...form,
    [key]: getBlockList(form, key).filter((_, index) => index !== blockIndex),
});

export const toRecordArray = (value: unknown): Array<Record<string, unknown>> =>
    Array.isArray(value)
        ? value.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object"))
        : [];
