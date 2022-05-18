import {Body, Controller, Delete, Get, Post, Put, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {EventService} from "./event.service";
import {FilesInterceptor} from "@nestjs/platform-express";
import {Express} from "express";
import {CreateEventDto} from "./dto/create-event.dto";


@Controller("/events")
export class EventController{
    constructor(private eventService: EventService) {
    }

    @Post('/create')
    @UseInterceptors(FilesInterceptor('image'))
    uploadFile(@UploadedFiles() files: Express.Multer.File[],
               @Body() dto: CreateEventDto){
        const image = files[0]
        const extention = image.originalname.split(".").pop()

        return this.eventService.create(dto, image.buffer, extention)
    }

    @Get()
    async getAll(){
        let filenames = await this.eventService.getAll()
        return filenames
    }


    @Put()
    update(){

    }

    @Delete()
    delete() {

    }

}