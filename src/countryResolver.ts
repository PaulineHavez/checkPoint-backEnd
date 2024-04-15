import { Query, buildSchema } from "type-graphql";
import Country from "./country";
class CountryResolver {
  @Query(() => [Country])
  countries() {
    return Country.find();
  }
}

export default CountryResolver;
