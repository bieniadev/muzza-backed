import { prop } from '@typegoose/typegoose';
import { Id } from './base.repository';

export class IdModel {
  _id?: Id;
}

export abstract class BaseModel extends IdModel {
  @prop()
  __v?: string;

  @prop({ type: Date })
  createdAt?: Readonly<Date>;

  @prop({ type: Date })
  updatedAt?: Readonly<Date>;
}
