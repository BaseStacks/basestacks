export type RoleLevel =
  | "Owner"
  | "Creator"
  | "Editor"
  | "Commenter"
  | "Viewer"
  | "No_Access";

export type MemberType = {
  readonly id: string;
  readonly users: string;
  readonly access: RoleLevel;
  readonly dateJoined: string;
};
