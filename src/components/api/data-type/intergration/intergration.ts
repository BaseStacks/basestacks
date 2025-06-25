export type DbType = "Mysql" | "PostgreSQL" | "MongoDB";
export type ConnectionType = Readonly<{
  readonly id: string;
  readonly name: string;
  readonly type: DbType;
  readonly date: string;
  readonly addBy: string;
  readonly usage: number;
}>;
export type DatabaseType = {
  readonly connectionName: string;
  readonly hostName: string;
  readonly port: string;
  readonly username: string;
  readonly password: string;
  readonly databaseName: string;
  readonly ssl?: string;
  readonly parameters: Array<{
    readonly key: string;
    readonly value: string;
  }>;
};
