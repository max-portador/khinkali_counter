import {IEvent, ModifiedEvent} from "../types/event";
import {daysDiff, sortEventByDate} from "./dateHelper";

export const addMinAmount = (acc, event: IEvent, i: number, arr: IEvent[]): ModifiedEvent[] => {
    let daysToNext = 0
    if (i < arr.length - 1){
        daysToNext = daysDiff(event.date, arr[i + 1].date)
    }
    let modifiedEvent = {...event, minAmount: acc.minAmount, daysToNext}
    acc.minAmount = event.amount + 1;
    acc.events.push(modifiedEvent)
    return acc
}

export const preparedEvents = (events: IEvent[]): ModifiedEvent[] => {
    return events
        .sort(sortEventByDate)
        .reduce(addMinAmount, {minAmount: 1, events: []})
        .events
}
