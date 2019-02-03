import { Entity, BaseEntity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import Chat from "./Chat"


@Entity()
class Message extends BaseEntity{

    @PrimaryColumn() id : number;

    @Column({type: "text"})
    text: string;

    @ManyToOne(type => Chat, chat => chat.message )
    chat: Chat;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;


}

export default Message;