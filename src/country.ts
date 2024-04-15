import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { CreateOrUpdateCountry } from "./country.args";

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

  constructor(country?: CreateOrUpdateCountry) {
    super();

    if (country) {
      this.name = country.name;
      this.code = country.code;
      this.emoji = country.emoji;
    }
  }

  static async saveNewCountry(
    countryData: CreateOrUpdateCountry
  ): Promise<Country> {
    const newCountry = new Country(countryData);
    const savedCountry = await newCountry.save();
    return savedCountry;
  }
}

export default Country;
