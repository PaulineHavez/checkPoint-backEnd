import country from "./country";
import { DataSource } from "typeorm";

async function Database() {
  const dataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    entities: [country],
    synchronize: true,
  });
  dataSource.initialize();
}

Database();
