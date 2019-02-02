import { Entity, BaseEntity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
class Place extends BaseEntity {

    @PrimaryColumn() id : number;

    @Column({type: "text"})
    ame: string;

    @Column({type: "double precision", default: 0})
    lat: number;

    @Column({type: "double precision", default: 0})
    lng: number;

    @Column({type: "text"})
    address: string;

    @Column({type:"boolean", default : false})
    isFav: boolean;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}

export default Place;