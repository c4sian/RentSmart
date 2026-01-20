export const setQueryParams = (data: Record<string, unknown>) => {
    const params = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            params.set(key, String(value));
        }
    });

    return params;
}