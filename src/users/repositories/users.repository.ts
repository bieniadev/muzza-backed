import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '../../common/bases/base.repository';
import { User } from '../models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';

export class UsersRepository extends BaseRepository<User> {
  constructor(
    @InjectModel(User.name) private userModel: ReturnModelType<typeof User>,
  ) {
    super(userModel);
  }
}
