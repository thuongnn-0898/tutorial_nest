import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  readonly saltOrRounds: number = 10;
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return UserEntity;
  }

  async beforeInsert(event: InsertEvent<UserEntity>): Promise<any> {
    const password = await bcrypt.hash(event.entity.password, this.saltOrRounds);
    event.entity.password = password
  }

  async beforeUpdate(event: UpdateEvent<UserEntity>): Promise<any> {
    const password = await bcrypt.hash(event.entity.password, this.saltOrRounds);
    event.entity.password = password
  }
}
