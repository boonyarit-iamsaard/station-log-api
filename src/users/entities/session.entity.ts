import { ISession } from 'connect-typeorm';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sessions' })
export class SessionEntity implements ISession {
  @Index()
  @Column({
    name: 'expired_at',
    type: 'bigint',
  })
  public expiredAt = Date.now();

  @PrimaryColumn({
    length: 255,
    type: 'varchar',
  })
  public id: '';

  @Column({
    type: 'text',
  })
  public json = '';
}
