export const parseDate = (strDate:string, sep='/'): Date => {
    let [day, month, year] = strDate.split('/').map(d => +d)
   return new Date(year, month - 1, day);
}

const formatOptions =
    {year: "2-digit",
    month: 'long',
    day: 'numeric'}

export const formatDateToStr = (date: Date) => {
    // @ts-ignore
    return date.toLocaleDateString("ru-RU", formatOptions )
}

export const dateDiff = (first: Date, second: Date): number => {
    let firstNum = first.getTime();
    let lastNum = second.getTime();
    return Math.round(lastNum - firstNum)
}
