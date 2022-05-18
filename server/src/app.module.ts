import {Module} from '@nestjs/common';
import {EventModule} from "./event/event.module";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [
      MongooseModule.forRoot('mongodb+srv://hotdog:hotgirl@cluster0.rn7ft.mongodb.net/?retryWrites=true&w=majority'),
      EventModule,
  ],

})
export class AppModule {}
