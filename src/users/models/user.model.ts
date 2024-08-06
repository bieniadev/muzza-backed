import { buildSchema, modelOptions, prop } from '@typegoose/typegoose';
import { BaseModel } from '../../common/bases/base.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User extends BaseModel {
  @prop({ required: true, unique: true, type: String })
  email: string;

  @prop({ required: true, type: String })
  password: string;

  @prop({ required: true, type: String })
  username: string;
}

export const UserSchema = buildSchema(User);
