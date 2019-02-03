import { Entity, BaseEntity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import Message from './Message';
import User from './User';

@Entity()
class Chat extends BaseEntity{

    @PrimaryColumn() id:number;

    @OneToMany( type => Message, message => message.chat )
    message: Message[];

    @OneToMany( type => User, user => user.chat )
    participants: User[];

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

}

export default Chat;
