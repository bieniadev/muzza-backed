import { IsDefined, IsMongoId, IsNotEmpty } from 'class-validator';

export class ObjectIdParams {
  @IsDefined()
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
