import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import {CatsService} from "./cats.service";
import { Cat } from './/cat.schema';
import * as nodemailer from 'nodemailer';
let testAccount =  nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.ethereal.email",
    port: 465,
    // true for 465, false for other ports
    auth: {
      user: 'hamzabava70@gmail.com', // generated ethereal user
      pass: 'nesetaiixtudqiyu', // generated ethereal password
    }})


    var generator = require('generate-password');

    var pass = generator.generate({
      length: 10,
      numbers: true
    });






export class CreateCatDto {
    _id?:string
    uname: string;
    mail: string;
    password?: string;
   
  
  }
  

  @Controller('cats')
export class CatController {
    constructor(private readonly catsService: CatsService) {}
     @Post()
async create(@Body() createCatDto: CreateCatDto) {
  createCatDto.password=pass;
  createCatDto._id=createCatDto.mail;
   const us=await this.catsService.createCat(createCatDto)
   if(us){
   let info = await transporter.sendMail({
    from: 'hamzabava70@gmail.com', // sender address
    to: us.mail, // list of receivers
    subject: "APP PASSWORD", // Subject line
    text: us.password, // plain text body
   // html: "<b>Hello world?</b>"
   })
   return "mail sent to";
  }
  return{
    err:"Some error"
    
  }

} 


@Get('i')
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
  @Get(':mail')
  async findOnee(@Param('mail') mail: string){
   
    const u= await this.catsService.findOnee(mail);
    if(u){
      if( u.password==pass)
      {
        return u;
      }
      else{
        return"wrong password";
      }
    }
    else{
      return"wrong mail";
    }

}

}