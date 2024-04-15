import { Mutation, Args } from "type-graphql";
import Continent from "./continent";
import { CreateContinent } from "./continent.args";

class ContinentResolver {
  @Mutation(() => Continent)
  createContinent(@Args() args: CreateContinent) {
    return Continent.saveNewContinent({ ...args });
  }
}

export default ContinentResolver;
