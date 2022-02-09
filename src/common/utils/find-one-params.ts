import { IsUUID } from 'class-validator';

export class FindOneParams {
  @IsUUID('all', { message: 'id must be a valid uuid' })
  id: string;
}
