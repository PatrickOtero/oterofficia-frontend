const LAST_PRESENCE_PREFIX = "oterofficia-admin-last-presence";
const SESSION_ANCHOR_PREFIX = "oterofficia-admin-session-anchor";
const SESSION_START_PREFIX = "oterofficia-admin-session-start";

const buildKey = (prefix: string, userId: string) => `${prefix}:${userId}`;

const getStorageWindow = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window;
};

export const ensureAdminPresenceSession = (userId: string) => {
  const storageWindow = getStorageWindow();

  if (!storageWindow) {
    return {
      since: null,
      until: null,
    };
  }

  const sessionStartKey = buildKey(SESSION_START_PREFIX, userId);
  const sessionAnchorKey = buildKey(SESSION_ANCHOR_PREFIX, userId);
  const existingSessionStart = storageWindow.sessionStorage.getItem(sessionStartKey);
  const existingSessionAnchor = storageWindow.sessionStorage.getItem(sessionAnchorKey);

  if (existingSessionStart) {
    return {
      since: existingSessionAnchor || null,
      until: existingSessionStart,
    };
  }

  const nextSessionStart = new Date().toISOString();
  const previousPresence = storageWindow.localStorage.getItem(buildKey(LAST_PRESENCE_PREFIX, userId));

  storageWindow.sessionStorage.setItem(sessionStartKey, nextSessionStart);

  if (previousPresence) {
    storageWindow.sessionStorage.setItem(sessionAnchorKey, previousPresence);
  } else {
    storageWindow.sessionStorage.removeItem(sessionAnchorKey);
  }

  return {
    since: previousPresence || null,
    until: nextSessionStart,
  };
};

export const getAdminPresenceBriefingWindow = (userId: string) => {
  const storageWindow = getStorageWindow();

  if (!storageWindow) {
    return {
      since: null,
      until: null,
    };
  }

  return {
    since: storageWindow.sessionStorage.getItem(buildKey(SESSION_ANCHOR_PREFIX, userId)) || null,
    until: storageWindow.sessionStorage.getItem(buildKey(SESSION_START_PREFIX, userId)) || null,
  };
};

export const markAdminPresence = (userId: string) => {
  const storageWindow = getStorageWindow();

  if (!storageWindow) {
    return;
  }

  storageWindow.localStorage.setItem(buildKey(LAST_PRESENCE_PREFIX, userId), new Date().toISOString());
};

export const clearAdminPresenceSession = () => {
  const storageWindow = getStorageWindow();

  if (!storageWindow) {
    return;
  }

  const sessionKeysToRemove: string[] = [];

  for (let index = 0; index < storageWindow.sessionStorage.length; index += 1) {
    const currentKey = storageWindow.sessionStorage.key(index);

    if (!currentKey) {
      continue;
    }

    if (
      currentKey.startsWith(`${SESSION_ANCHOR_PREFIX}:`) ||
      currentKey.startsWith(`${SESSION_START_PREFIX}:`)
    ) {
      sessionKeysToRemove.push(currentKey);
    }
  }

  sessionKeysToRemove.forEach((key) => {
    storageWindow.sessionStorage.removeItem(key);
  });
};
