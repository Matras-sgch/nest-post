import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getJoke(): Promise<any> {
    return this.httpService.get('https://api.jokes.one/jod?category=animal')
        .toPromise()
        .then(res => res.data)
    // return this.httpService.get('https://api.jokes.one/jod?category=animal');
  }
}
