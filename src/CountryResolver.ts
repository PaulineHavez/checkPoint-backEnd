import { Query, Mutation, Args, Arg, ID } from "type-graphql";
import Country from "./country";
import { CreateOrUpdateCountry } from "./country.args";
class CountryResolver {
  @Query(() => [Country])
  countries() {
    return Country.getCountries();
  }

  @Query(() => Country)
  country(@Arg("id", () => ID) id: string) {
    return Country.getCountryById(id);
  }

  @Mutation(() => Country)
  createCountry(@Args() args: CreateOrUpdateCountry) {
    return Country.saveNewCountry({ ...args });
  }
}

export default CountryResolver;
