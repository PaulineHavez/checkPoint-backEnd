import { ApolloServer } from "@apollo/server";
import Country from "./country";
import { DataSource } from "typeorm";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import CountryResolver from "./CountryResolver";
import Continent from "./continent";
import ContinentResolver from "./ContinentResolver";

async function Database() {
  const dataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    entities: [Country, Continent],
    synchronize: true,
  });
  dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [CountryResolver, ContinentResolver],
  });
  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

Database();
