import { Query, Mutation, Args } from "type-graphql";
import Country from "./country";
import { CreateOrUpdateCountry } from "./country.args";
class CountryResolver {
  @Query(() => [Country])
  countries() {
    return Country.find();
  }

  @Mutation(() => Country)
  createCountry(@Args() args: CreateOrUpdateCountry) {
    return Country.saveNewCountry({ ...args });
  }
}

export default CountryResolver;
