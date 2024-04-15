import { ApolloServer } from "@apollo/server";
import Country from "./country";
import { DataSource } from "typeorm";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import CountryResolver from "./CountryResolver";

async function Database() {
  const dataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    entities: [Country],
    synchronize: true,
  });
  dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [CountryResolver],
  });
  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

Database();
