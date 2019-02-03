import { Entity, BaseEntity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import Message from './Message';

@Entity()
class Chat extends BaseEntity{

    @PrimaryColumn() id:number;

    @OneToMany( type => Message, message => message.chat )
    message: Message[];

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

}

export default Chat;
