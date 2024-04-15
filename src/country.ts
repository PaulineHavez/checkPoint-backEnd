import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { CreateOrUpdateCountry } from "./country.args";
import Continent from "./continent";

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

  @ManyToOne(() => Continent, (continent) => continent.countries, {
    eager: true,
  })
  @Field(() => Continent)
  continent!: Continent;

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
    if (countryData.continentId) {
      const category = await Continent.getContinentById(
        countryData.continentId
      );
      newCountry.continent = category;
    }

    const savedCountry = await newCountry.save();
    return savedCountry;
  }

  static async getCountries(): Promise<Country[]> {
    const countries = await Country.find();
    return countries;
  }

  static async getCountriesByContinentCode(
    countryCode: string
  ): Promise<Country[]> {
    const countries = await Country.find({
      where: { continent: { code: countryCode } },
    });
    return countries;
  }

  static async getCountryByCode(code: string): Promise<Country> {
    const country = await Country.findOne({
      where: { code },
    });
    if (!country) {
      throw new Error(`Country with code ${code} does not exist.`);
    }
    return country;
  }
}

export default Country;
