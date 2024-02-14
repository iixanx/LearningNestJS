import { ArgumentsHost, Catch, ExceptionFilter, HttpException, InternalServerErrorException, Logger } from '@nestjs/common';
import { timeStamp } from 'console';

@Catch()
export class HttpExceptionFilter<Error> implements ExceptionFilter {
  constructor (
    private readonly logger = new Logger('Learning-Nest-JS')
  ) { }
  catch(exception: Error | InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    if(!(exception instanceof HttpException)) exception = new InternalServerErrorException();

    const response = (exception as HttpException).getResponse();

    console.log({
      timeStamp: new Date(),
      request: req.originalUrl,
      response,
    })

    this.logger.error(
      `URL "${req.originalUrl}" ` + 
      `ERROR "${(response as any).statusCode} ${(response as any).error}" ` +
      `${(response as any).message}`
      )

    res.status((exception as HttpException).getStatus()).json(response);
  }
}