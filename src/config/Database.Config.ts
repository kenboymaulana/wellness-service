import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get('DB_DRIVER'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        // type: process.env.DB_DRIVER,
        // host: process.env.DB_HOST,
        // port: process.env.DB_PORT,
        // username: process.env.DB_USER,
        // password: '',
        // database: process.env.DB_NAME,
        entities: ['dist/modules/**/**/*.Entity.js'],
        synchronize: true,
      }),
    }),
  ],
})
export default class DatabaseConfig {}
