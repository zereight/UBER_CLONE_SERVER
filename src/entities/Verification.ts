import { BaseEntity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert,  Entity } from 'typeorm';

type verificationTarget = "PHONE" | "EMAIL"; //Verification에서만 쓸 사용자 정의 타입.

//Verification은 phone이나 email등의 유효성을 검사할 것임.
@Entity() // 이거 빠트렸었네 ;;
class Verification extends BaseEntity{

    @PrimaryColumn() id : number;

    @Column({type: "text", enum: ["PHONE", "EMAIL"]}) //target은 PHONE이랑 EMAIL밖에 없기때문에 따로 타입을 만들어줌.
    target: verificationTarget;

    @Column({type: "text"})
    payload: string;

    @Column({type: "text"})
    key: string;

    @Column({type: "boolean", default: false})
    verified: boolean;

    @CreateDateColumn()
    createAt: string;

    @UpdateDateColumn()
    updateAt: string;

    @BeforeInsert() //객체생성바로 전에 실행
    createKey():void { //this.key에 정보만 주고 사라지는 함수므로 딱히 Verification.graphql에 저장해줄 필요는 없음.
        if (this.target === "PHONE"){
            //짧은 키
            this.key = Math.floor( Math.random() * 100000 ).toString()
        }
        else if (this.target === "EMAIL"){
            //긴 키 python처럼 [:]문자열 슬라이싱 안됨 substr써야됨.
            this.key = Math.random().toString(36).substring(2);
        }
    }

}

export default Verification;