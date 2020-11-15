import { Controller, Get, HttpService } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly http: HttpService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('jokeWithAxios')
  async getJoke(): Promise<any> {
    return await this.appService.getJoke()
  }
}
