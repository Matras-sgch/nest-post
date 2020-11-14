import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as morgan from 'morgan'
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      exitOnError: false,
      format: format.combine(format.colorize(), format.timestamp(), format.printf(msg => {
        return `${msg.timestamp} [${msg.level}] - ${msg.message}`;
      })),
      transports: [new transports.Console({ level: "debug" })], // alert > error > warning > notice > info > debug
    }),
  });
  app.use(morgan('dev'))
  app.useGlobalPipes(new ValidateInputPipe())

  // define the options or config settinga for swagger document
  const options = new DocumentBuilder()
    .setTitle('Rest-api example')
    .setDescription('by Marat Sergievich. With PostgreSQL and Sequelize')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  // setup the swagger module 
  SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
