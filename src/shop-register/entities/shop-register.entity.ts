import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ShopRegister {
    //genarate id 
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    shopName: string;

    @Column()
    mobile: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    pincode: string;

    @Column()
    picture: string;

    @Column()
    userId: number

}
