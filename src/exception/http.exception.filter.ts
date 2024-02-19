import { ArgumentsHost, Catch, ExceptionFilter, HttpException, InternalServerErrorException, Logger } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter<HttpException> implements ExceptionFilter {
  constructor (
    private readonly logger = new Logger('Learning-Nest-JS')
  ) { }
  catch(exception: HttpException | InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    if(!(exception instanceof HttpException)) exception = new InternalServerErrorException();

    const response = exception.getResponse();

    this.logger.error(
      `URL "${req.originalUrl}" ` + 
      `ERROR "${(response as any).statusCode} ${(response as any).message}"`
      )
    res.status(exception.getStatus()).json(response);
  }
}