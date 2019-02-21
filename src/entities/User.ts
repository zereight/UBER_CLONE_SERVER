import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany } from "typeorm";
import { IsEmail } from "class-validator";
import { hashSync,genSaltSync,compareSync } from "bcrypt-nodejs";
import Chat from './Chat';
import Message from './Message';
import Ride from "./Ride";
import Place from "./Place";



@Entity()
class User extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({type: "text", unique:true}) // 가입할 email은 반드시 1개 unique해야하기 때문.
    @IsEmail() //class-validator에 있는 기능으로 email형식인지 validate하는 기능이다.
    email: string | null;

    @Column({type: "boolean", default: false})
    verifiedEmail: boolean;

    @Column({type: "text"}) //성은 중복될 수 있으므로 unique X
    firstName: string;

    @Column({type:"text"})
    lastName: string;

    @Column({type: "int", nullable: true})
    age: number;

    @Column({type:"text", nullable: true})
    password: string;

    @Column({type:"text", nullable: true})
    phoneNumber: string;

    @Column({type:"boolean", default: false})
    verifiedPhonenumber: boolean;

    @Column({type:"text"})
    profilePhoto: string;

    @Column({type:"boolean", default: false})
    isDriving:boolean;

    @Column({type:"boolean", default: false})
    isRiding:boolean;

    @Column({type:"boolean", default: false})
    isTaken:boolean;

    //graphql엔 type이 float인데 여긴 double precision인 이유:
    //float 타입에 버그가있어서.
    //double precision은 postgres에서 사용되는 float의 또 다른 이름.
    @Column({type:"double precision", default: 0})
    lastLng:number;

    @Column({type:"double precision", default: 0})
    lastLat:number;

    @Column({type:"double precision", default: 0})
    lastOrientation:number;

    @Column({type: "text", nullable: true})
    fbId: string;

    @ManyToOne(type => Chat, chat => chat.participants)
    chat: Chat;

    @OneToMany( type => Message, message => message.user )
    messages : Message[];

    @OneToMany(type => Place, place => place.user)
    places: Place[];

    @OneToMany(type => Ride, ride => ride.passenger)
    ridesAsPassenger: Ride[];

    @OneToMany(type => Ride, ride => ride.driver)
    ridesAsDriver: Ride[];

    //createdAt, updatedAt은 따로 Column이 있음.
    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    //fullName은 Column이 아니다. string을 반환하는 함수다. (class의 함수 처럼선언)
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    @BeforeInsert() //새 객체를 만들기 전에 불려지는 메소드다.
    @BeforeUpdate() //객체를 update하기 전에 불려지는 메소스다.
    async savePassword() : Promise<void> { //async 함수는 반드시 Promise<>형을 반환
        if(this.password){
            //비동기 함수이안의 다른 함수들은 await로 기다리게 만들어주자. 안그러면 함수가 끝나기도 전에 비동기함수가 끝나버려서 에러뜰 수도 있음.
            this.password = await hashSync(this.password, genSaltSync(10));
        }
    }

    public compare_PW( pw : string ) : boolean {
        return compareSync(pw, this.password);
    }

};

export default User;