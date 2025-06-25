import type { DbType } from "../intergration/intergration";

export type MetaSyncType = {
  readonly models: string;
  readonly syncState: string;
};
export type VisibilityType = {
  readonly tableName: string;
  readonly viewName: string;
  readonly editor: string;
  readonly commenter: string;
  readonly viewer: string;
};
export type DataSourceType = {
  readonly id: string;
  readonly sourceName: string;
  readonly type: DbType;
  readonly connection: string;
  readonly database?: string;
  readonly visible: boolean;
  readonly allowReadWrite?: boolean;
  readonly allowSchemaChanges?: boolean;
  readonly fieldName?: string;
  readonly tableName?: string;
};
export type SnapshotType = {
  readonly id: string;
  readonly name: string;
  readonly creator: string;
  readonly createdAt: string;
};
export type AllTableType = Readonly<{
  readonly name: string;
  readonly description: string;
  readonly source: string;
  readonly createdOn: string;
}>;
