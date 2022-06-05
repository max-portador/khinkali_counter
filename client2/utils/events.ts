import {IEvent} from "../types/event";
import {sortEventByDate} from "./dateHelper";

export const addMinAmount = (acc, event: IEvent) => {
    let modifiedEvent = {...event, minAmount: acc.minAmount}
    acc.minAmount = event.amount + 1;
    acc.events.push(modifiedEvent)
    return acc
}

export const preparedEvents = (events: IEvent[]) => {
    return events
        .sort(sortEventByDate)
        .reduce(addMinAmount, {minAmount: 1, events: []})
        .events
}