import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { IsEmail } from "class-validator";
import { hashSync,genSaltSync } from "bcrypt-nodejs";

@Entity()
class User extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;

    @Column({type: "text", unique:true}) // 가입할 email은 반드시 1개 unique해야하기 때문.
    @IsEmail() //class-validator에 있는 기능으로 email형식인지 validate하는 기능이다.
    email: string;

    @Column({type: "boolean", default: false})
    verifiedEmail: boolean;

    @Column({type: "text"}) //성은 중복될 수 있으므로 unique X
    firstName: string;

    @Column({type:"text"})
    lastName: string;

    @Column({type: "int"})
    age: number;

    @Column({type:"text"})
    password: string;

    @Column({type:"text"})
    phoneNumber: string;

    @Column({type:"boolean", default: false})
    verifiedPhonenumber: boolean;

    @Column({type:"text"})
    profilePhoto: string;

    //fullName은 Column이 아니다. string을 반환하는 함수다. (class의 함수 처럼선언)
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

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

    //createdAt, updatedAt은 따로 Column이 있음.
    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;

    @BeforeInsert() //새 객체를 만들기 전에 불려지는 메소드다.
    @BeforeUpdate() //객체를 update하기 전에 불려지는 메소스다.
    async savePassword() : Promise<void> { //async 함수는 반드시 Promise<>형을 반환
        if(this.password){
            this.password = await hashSync(this.password, genSaltSync(10));
        }
    }

};

export default User;