import { Body, Controller, Logger, Post, ValidationPipe } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './DTOs/create-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  private logger = new Logger('UsersController');

  constructor(private usersService: UsersService) {}

  @Post('/')
  @ApiCreatedResponse({description: 'User has been successfully registered.'})
  @ApiConflictResponse({description: 'User with provided email exists.'})
  async create(@Body(ValidationPipe) createUserDTO: CreateUserDTO): Promise<{ id: string }> {
   return await this.usersService.create(createUserDTO);
  }
}
