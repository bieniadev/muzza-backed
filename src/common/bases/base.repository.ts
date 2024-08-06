import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { QueryOptions, Types, FilterQuery } from 'mongoose';

export type Id = string | Types.ObjectId;

export type UpdateOptions = Partial<{ upsert: true; new: true } & QueryOptions>;

export abstract class BaseRepository<T> {
  public static readonly COLLATION_LOCALE = 'pl';

  protected constructor(
    protected readonly mongooseModel: ReturnModelType<AnyParamConstructor<T>>,
    private readonly searchStringFields: string[] = [],
  ) {}

  findById(id: Id, select?: string) {
    return this.mongooseModel.findById(id, select).lean().exec();
  }

  findOne(conditions: FilterQuery<DocumentType<T>>) {
    return this.mongooseModel.findOne(conditions).lean().exec();
  }

  findMany(conditions: FilterQuery<DocumentType<T>>, select?: string) {
    return this.mongooseModel.find(conditions).select(select).lean().exec();
  }

  findAndPopulate(conditions: FilterQuery<DocumentType<T>>, populate: string) {
    return this.mongooseModel
      .findOne(conditions)
      .populate(populate)
      .lean()
      .exec();
  }

  updateById(id: Id, model: any, options?: UpdateOptions) {
    return this.mongooseModel
      .findByIdAndUpdate(id, model, options)
      .lean()
      .exec();
  }

  updateByIdAndPopulate(
    id: Id,
    model: any,
    populate = '',
    options?: UpdateOptions,
  ) {
    return this.mongooseModel
      .findByIdAndUpdate(id, model, options)
      .populate(populate)
      .lean()
      .exec();
  }

  updateOne(conditions: FilterQuery<DocumentType<T>>, query) {
    return this.mongooseModel.updateOne(conditions, query).lean().exec();
  }

  updateMany(conditions: FilterQuery<DocumentType<T>>, query) {
    return this.mongooseModel.updateMany(conditions, query).lean().exec();
  }

  createOne(model: any) {
    return this.mongooseModel.create(model).then((result) => result.toObject());
  }

  deleteById(id: Id) {
    return this.mongooseModel.findByIdAndDelete(id);
  }

  deleteMany(conditions: FilterQuery<DocumentType<T>>) {
    return this.mongooseModel.deleteMany(conditions);
  }

  count(conditions: FilterQuery<DocumentType<T>>) {
    return this.mongooseModel.countDocuments(conditions).exec();
  }
}
