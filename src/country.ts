import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { CreateOrUpdateCountry } from "./country.args";

@Entity()
@ObjectType()
class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ unique: true })
  @Field()
  name!: string;

  @Column({ unique: true })
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

  static async getCountries(): Promise<Country[]> {
    const countries = await Country.find();
    return countries;
  }

  static async getCountryByCode(code?: string): Promise<Country[]> {
    const countries = await Country.find({
      where: { code },
    });
    return countries;
  }
}

export default Country;
