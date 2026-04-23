export const SPACE_THEMES = ["earth", "mars", "jupiter", "saturn", "space", "asteroids"] as const;

export type SpaceTheme = (typeof SPACE_THEMES)[number];

export const SPACE_THEME_LABELS: Record<SpaceTheme, string> = {
    earth: "Terra",
    mars: "Marte",
    jupiter: "Jupiter",
    saturn: "Saturno",
    space: "Espaco",
    asteroids: "Asteroides",
};

export const isSpaceTheme = (value: string | null): value is SpaceTheme =>
    Boolean(value && SPACE_THEMES.includes(value as SpaceTheme));

const getSpaceThemeIndex = (spaceTheme: SpaceTheme) => SPACE_THEMES.indexOf(spaceTheme);

export const getNextSpaceTheme = (spaceTheme: SpaceTheme): SpaceTheme => {
    const currentIndex = getSpaceThemeIndex(spaceTheme);

    return SPACE_THEMES[(currentIndex + 1) % SPACE_THEMES.length];
};

export const getPreviousSpaceTheme = (spaceTheme: SpaceTheme): SpaceTheme => {
    const currentIndex = getSpaceThemeIndex(spaceTheme);

    return SPACE_THEMES[(currentIndex - 1 + SPACE_THEMES.length) % SPACE_THEMES.length];
};

export const getSpaceThemeLabel = (spaceTheme: SpaceTheme) => SPACE_THEME_LABELS[spaceTheme];
