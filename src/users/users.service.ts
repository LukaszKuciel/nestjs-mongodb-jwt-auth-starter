import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { PasswordHelper } from 'src/common/helpers/password.helper';
import { v4 } from 'uuid';
import { CreateUserDTO } from './DTOs/create-user.dto';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger('UsersService');

  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHelper: PasswordHelper,
  ) {}

  async create({ email, password }: CreateUserDTO): Promise<{ id: string }> {
    const existingUser = await this.userRepository.findByEmail(email);
    if(existingUser) {
      this.logger.error(``)
      throw new ConflictException(`User with email ${email} already exists.`);
    }

    const securePassword = await this.passwordHelper.secure(password);

    const createdUser = await this.userRepository.create({
      email,
      id: v4(),
      password: securePassword,
    });

    return {
      id: createdUser.id
    };
  }
}
