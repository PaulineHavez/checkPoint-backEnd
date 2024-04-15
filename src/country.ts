import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
@ObjectType()
class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  code!: string;

  @Column()
  @Field()
  emoji!: string;
}

export default Country;
