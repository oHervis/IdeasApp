import 'dotenv/config';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

const port = process.env.PORT || 4000;
declare const module: any;
console.log('aquiiiiiiiiiiiiiiiiii');
async function bootstrap() {
  console.log('entrouuuu');
  const app = await NestFactory.create(AppModule);
  console.log(app);
  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
