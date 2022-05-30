export const CardOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
} as const;

export const formatDate = (date: string, options:  Intl.DateTimeFormatOptions) =>
    new Date(date).toLocaleString("ru", options)


