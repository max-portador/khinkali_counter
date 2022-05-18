import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Event, EventDocument} from "./schemas/event.schema";
import {Model} from "mongoose";
import {CreateEventDto} from "./dto/create-event.dto";
import * as path from 'path'
import * as fs from 'fs'
import {v4} from 'uuid'


@Injectable()
export class EventService{

    constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}

    async create(dto: CreateEventDto, image: Buffer, imageExtention): Promise<Event>{
        const event = await this.eventModel.create({
            ...dto, image, imageExtention
        })

        return event
    }

    async getAll():Promise<string[]>{
        const events = await this.eventModel.find()
        console.log(events.length)
        let names = []
        const filepath = path.resolve(__dirname, '..', '..', 'uploads')
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true})
        }
        console.log(filepath)
        events.forEach( e => {
            // buffer = Buffer.from(e.image).toString('base64')


            const fileName = `${v4()}.${e.imageExtention}`
            names.push(fileName)

            fs.writeFileSync(path.resolve(filepath, fileName), e.image)
        })

        return names
    }

    async update(){

    }

    async delete() {

    }
}