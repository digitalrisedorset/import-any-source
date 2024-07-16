export const isArray = (data: unknown): boolean => {
    return !!(data !== null
        && data !== undefined
        && Array.isArray(data));
}

export const isObject = (data: unknown): boolean => {
    return !!(data !== null
        && data !== undefined
        && typeof data === "object");
}