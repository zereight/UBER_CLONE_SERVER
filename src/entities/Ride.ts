import { BaseEntity, Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import User from './User';

type STATUS = 
    "ACCEPTED" |
    "FINISHED" |
    "CANCELED" |
    "REQUESTING" |
    "ONROUTE";


@Entity()
class Ride extends BaseEntity{
    @PrimaryColumn()
    id: number;

    @Column({type: "text", enum : ["ACCEPTED", "FINISHED" ,"CANCELED" ,"REQUESTING", "ONROUTE"]})
    status: STATUS;

    @Column({type: "text"})
    pickUpAddress: string;

    @Column({type: "double precision", default: 0})
    pickUpLat: number;

    @Column({type: "double precision", default: 0})
    puckUpLng: number;

    @Column({type:"text"})
    dropOffAddress: string;

    @Column({type: "double precision", default: 0})
    dropOffLat: number;

    @Column({type: "double precision", default: 0})
    dropOffLng: number;

    @Column({type: "double precision", default: 0})
    price: number;

    @Column({type: "text"})
    distance: string;

    @Column({type: "text"})
    duration: string;

    @ManyToOne(type => User, user => user.ridesAsPassenger)
    passenger : User;

    @ManyToOne(type => User, user => user.ridesAsDriver)
    driver: User;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}

export default Ride;