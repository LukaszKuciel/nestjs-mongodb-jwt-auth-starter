import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordHelper } from 'src/common/helpers/password.helper';
import { UserRepository } from './repositories/user.repository';
import { UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, PasswordHelper]
})
export class UsersModule {}
