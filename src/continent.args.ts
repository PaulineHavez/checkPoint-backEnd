import { Field, ArgsType } from "type-graphql";

@ArgsType()
export class CreateContinent {
  @Field()
  name!: string;

  @Field()
  code!: string;
}
