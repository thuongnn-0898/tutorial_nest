import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    UpdateEvent,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    readonly saltOrRounds: number = 10;
    constructor(connection: Connection) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return User;
    }

    async beforeInsert(event: InsertEvent<User>): Promise<any> {
        const password = await bcrypt.hash(event.entity.password, this.saltOrRounds);
        event.entity.password = password
    }

    async beforeUpdate(event: UpdateEvent<User>): Promise<any> {
        const password = await bcrypt.hash(event.entity.password, this.saltOrRounds);
        event.entity.password = password
    }
}