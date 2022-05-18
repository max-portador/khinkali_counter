import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type EventDocument = Event & Document

@Schema()
export class Event {
    @Prop()
    dateDMY: string;

    @Prop()
    count: number;

    @Prop()
    image: Buffer;

    @Prop()
    imageExtention: string;
}

export const EventSchema = SchemaFactory.createForClass(Event)