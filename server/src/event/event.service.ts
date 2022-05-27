import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {KhinkaliEvent, KhinkaliEventDocument} from "./schemas/event.schema";
import {CreateEventDto} from "./dto/create-event.dto";
import {FileService} from "../files/file.service";
import {Model, Types} from "mongoose";


@Injectable()
export class EventService{

    constructor(@InjectModel(KhinkaliEvent.name) private khinkaliEventModel:  Model<KhinkaliEventDocument>,
                private readonly fileService: FileService) {}

    async create(dto: CreateEventDto, buffer: Buffer, imageName: string): Promise<EventWithoutBuffer>{
        const event = await this.khinkaliEventModel.create({
            ...dto, buffer, imageName
        })

        return {
            date: event.date,
            amount: event.amount,
            imageName: event.imageName,
        }
    }

    async getAll():Promise<EventWithId[]>{
        const events = await this.khinkaliEventModel.find().sort('dateDMY')
        this.fileService.createIfNotExists(events)
        return events.map( event => ({
            _id: event._id,
            date: event.date,
            amount: event.amount,
            imageName: event.imageName,
        }))
    }

    async update(dto: CreateEventDto, _id: Types.ObjectId, image: Express.Multer.File){
        const extention = image.originalname.split(".").pop()
        const event = await this.khinkaliEventModel.findById(_id)
        if (event) {
            this.fileService.deleteFile(event.imageName)

            event.buffer = image.buffer
            event.imageName = event.imageName.split(".").shift() + '.' + extention
            event.date = dto.date
            event.amount = dto.amount

            this.fileService.createFile(event.imageName, image.buffer)

            await event.save()
            return event._id
        }
        return "Не удалось найти в базе данных"
    }

    async delete(id: Types.ObjectId): Promise<Types.ObjectId> {
        const event = await this.khinkaliEventModel.findByIdAndDelete(id)
        if (event){
            this.fileService.deleteFile(event.imageName)
        }
        return event?._id
    }
}

export type EventWithoutBuffer = {
    date: Date,
    amount: number,
    imageName: string
}

export type EventWithId = EventWithoutBuffer & {_id: Types.ObjectId}