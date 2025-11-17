<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Comandos utilizados

```bash
# Instalar CLI de NestJS de forma global
$ npm install -g @nestjs/cli

#Verificar instalación
$ nest --version

#Creado proyecto en carpeta actual
$ nest new .

#Dependencias para conectar con MySQL
$ npm install --save @nestjs/typeorm typeorm mysql2

#Modulo de configuración
$ npm install @nestjs/config

#Instalaciones para JWT
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install --save-dev @types/passport-jwt
npm install bcryptjs

#Instalación de validadores
npm install class-validator class-transformer

```

## Instalación de Swagger
```
npm install --save @nestjs/swagger swagger-ui-express
```

<li>
  <ol>Abre el archivo src/main.ts.</ol>
  <ol>Importa las clases necesarias (DocumentBuilder, SwaggerModule).</ol>
  <ol>Agrega la configuración antes de app.listen.</ol>
<li>

```
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // <--- 1. IMPORTAR

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS (que hablamos antes)
  app.enableCors();

  // ---> 2. CONFIGURACIÓN DE SWAGGER (INICIO)
  const config = new DocumentBuilder()
    .setTitle('API de Encomiendas')
    .setDescription('Documentación para el sistema de gestión de pedidos')
    .setVersion('1.0')
    .addTag('encomiendas') // Opcional, para agrupar
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 
  // 'api' es la ruta. Entrarás por http://localhost:3000/api
  // ---> FIN CONFIGURACIÓN SWAGGER

  await app.listen(3000);

  console.log(' Aplicación corriendo en: http://localhost:' + port);
  console.log(' Swagger UI:           http://localhost:' + port + '/docs');
}
bootstrap();
```