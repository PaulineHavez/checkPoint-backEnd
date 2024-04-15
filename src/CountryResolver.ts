import { Query, Mutation, Args, Arg, ID } from "type-graphql";
import Country from "./country";
import { CreateOrUpdateCountry } from "./country.args";
class CountryResolver {
  @Query(() => [Country])
  countries() {
    return Country.getCountries();
  }

  @Query(() => [Country])
  countriesByContinentCode(@Arg("continentCode") continentCode: string) {
    return Country.getCountriesByContinentCode(continentCode ?? undefined);
  }

  @Query(() => Country)
  countryByCode(@Arg("code") code: string) {
    return Country.getCountryByCode(code);
  }

  @Mutation(() => Country)
  createCountry(@Args() args: CreateOrUpdateCountry) {
    return Country.saveNewCountry({ ...args });
  }
}

export default CountryResolver;
