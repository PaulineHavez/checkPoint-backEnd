import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Country from "./country";
import { Field, ID, Int, ObjectType } from "type-graphql";
import { CreateContinent } from "./continent.args";

@Entity()
@ObjectType()
class Continent extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  name!: string;

  @Column({ nullable: false })
  @Field()
  code!: string;

  @OneToMany(() => Country, (country) => country.continent)
  @Field(() => [Country])
  countries!: Country[];

  constructor(continent?: Partial<Continent>) {
    super();

    if (continent) {
      if (!continent.name) {
        throw new Error("Continent name cannot be empty.");
      }
      this.name = continent.name;
      if (continent.code) {
        this.code = continent.code;
      } else {
        throw new Error("Continent code cannot be empty.");
      }
    }
  }

  static async saveNewContinent(
    continentData: CreateContinent
  ): Promise<Continent> {
    if (!continentData.code) {
      throw new Error("Continent code cannot be empty.");
    }

    const newContinent = new Continent(continentData);
    const savedContinent = await newContinent.save();
    return savedContinent;
  }

  static async getContinentById(id: number): Promise<Continent> {
    const continent = await Continent.findOneBy({ id });
    if (!continent) {
      throw new Error(`Continent with ID ${id} does not exist.`);
    }
    return continent;
  }
}

export default Continent;
