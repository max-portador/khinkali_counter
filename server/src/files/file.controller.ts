import {Controller, Post, UploadedFiles, UseInterceptors} from "@nestjs/common";
import {FilesInterceptor} from "@nestjs/platform-express";
import { Express } from 'express'
import * as path from 'path'
import * as fs from 'fs'

@Controller('/uploads')
export class FileController{

    @Post()
    @UseInterceptors(FilesInterceptor('image'))
    uploadFile(@UploadedFiles() files: Express.Multer.File[]){
        const file = files[0]
        console.log(file)
        const filepath = path.resolve(__dirname, '..', '..', 'uploads')
        if (!fs.existsSync(filepath)) {
            fs.mkdirSync(filepath, { recursive: true})
        }
        console.log(filepath)
        fs.writeFileSync(path.resolve(filepath, file.originalname), file.buffer)
        return "Ok"
    }

}
