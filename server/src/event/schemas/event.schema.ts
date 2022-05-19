import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type KhinkaliEventDocument = KhinkaliEvent & Document

@Schema()
export class KhinkaliEvent {
    @Prop()
    dateDMY: string;

    @Prop()
    count: number;

    @Prop()
    buffer: Buffer;

    @Prop()
    imageName: string;
}

export const KhinkaliEventSchema = SchemaFactory.createForClass(KhinkaliEvent)