import { Field, ArgsType, ID } from "type-graphql";

@ArgsType()
export class CreateOrUpdateCountry {
  @Field()
  name!: string;

  @Field()
  code!: string;

  @Field()
  emoji!: string;

  @Field(() => ID)
  continentId!: number;
}
