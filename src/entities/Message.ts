import { Entity, BaseEntity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Chat from "./Chat"
import User from './User';


@Entity()
class Message extends BaseEntity{

    @PrimaryColumn() id : number;

    @Column({type: "text"})
    text: string;

    @ManyToOne(type => Chat, chat => chat.message )
    chat: Chat;

    @ManyToOne( type => User, user => user.messages )
    user: User;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;


}

export default Message;