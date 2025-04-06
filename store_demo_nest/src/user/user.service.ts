import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    const existingUser = await this.userModel.findOne({ where: { username } });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const user = new User();
    user.username = username;
    user.password = password; // Lưu ý: Cần mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
}