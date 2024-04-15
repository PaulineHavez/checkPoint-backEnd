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

  static async getCountries(): Promise<Country[]> {
    const countries = await Country.find();
    return countries;
  }

  static async getCountryById(id: string): Promise<Country> {
    const country = await Country.findOne({
      where: { id: parseInt(id, 10) },
    });
    if (!country) {
      throw new Error(`Country with ID ${id} does not exist.`);
    }
    return country;
  }
}

export default Country;
