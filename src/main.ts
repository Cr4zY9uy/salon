import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { AllExceptionsFilter } from './libs/globals/all-exceptions.filter'
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  })
  app.useGlobalFilters(new AllExceptionsFilter())
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  await app.listen(3000, () => console.log('Server is running at port:3000'))
}
bootstrap()
