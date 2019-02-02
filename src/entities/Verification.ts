import { BaseEntity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

type verificationTarget = "PHONE" | "EMAIL"; //Verification에서만 쓸 사용자 정의 타입.

//Verification은 phone이나 email등의 유효성을 검사할 것임.
class Verification extends BaseEntity{

    @PrimaryColumn() id : number;

    @Column({type: "text", enum: ["PHONE", "EMAIL"]}) //target은 PHONE이랑 EMAIL밖에 없기때문에 따로 타입을 만들어줌.
    target: verificationTarget;

    @Column({type: "text"})
    payload: string;

    @Column({type: "text"})
    key: string;

    @Column({type:"boolean", default: false})
    used: boolean;

    @CreateDateColumn()
    createAt: string;

    @UpdateDateColumn()
    updateAt: string;

}

export default Verification;