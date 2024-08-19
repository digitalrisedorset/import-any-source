export const isArray = (data: unknown): data is Array => {
    return !!(data !== null
        && data !== undefined
        && Array.isArray(data));
}

export const isObject = (data: unknown): data is Object => {
    return !!(data !== null
        && data !== undefined
        && typeof data === "object");
}