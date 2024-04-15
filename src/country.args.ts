import { Field, Float, Int, ArgsType } from "type-graphql";
// import { Min, MinLength } from "class-validator";

@ArgsType()
export class CreateOrUpdateCountry {
  @Field()
  name!: string;

  @Field()
  code!: string;

  @Field()
  emoji!: string;
}
