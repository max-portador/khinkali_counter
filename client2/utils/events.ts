import {IEvent, ModifiedEvent} from "../types/event";
import {daysDiff, sortEventByDate} from "./dateHelper";

export const addMinAmount = (acc, event: IEvent, i: number, arr: IEvent[]): ModifiedEvent[] => {
    let daysFromPrev = 0
    if (i < arr.length - 1){
        daysFromPrev = daysDiff( arr[i + 1].date, event.date)
    }
    let modifiedEvent = {...event, minAmount: acc.minAmount, daysFromPrev}
    acc.minAmount = event.amount + 1;
    acc.events.push(modifiedEvent)
    return acc
}

export const preparedEvents = (events: IEvent[], reverse=false): ModifiedEvent[] => {
    if (!events) return []
    return events
        .sort(sortEventByDate)
        .reduce(addMinAmount, {minAmount: 1, events: []})
        .events
}
