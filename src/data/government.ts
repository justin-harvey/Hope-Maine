// Blank template. Board rosters, officials, and committees are managed in the
// admin (Boards collection) and here. This ships with no members so the
// Government page renders empty sections until a town fills them in.

export type SelectBoardMember = {
  name: string;
  role: string;
  email: string | null;
  termExpires: string;
};

export const selectBoard: {
  meets: string;
  agendaNote: string;
  boardEmail: string;
  members: SelectBoardMember[];
} = {
  meets: "Meeting schedule not published yet.",
  agendaNote: "",
  boardEmail: "",
  members: [],
};

export type TownOfficial = {
  name: string;
  role: string;
  otherRoles: string[];
  email: string;
};

export const townOfficials: TownOfficial[] = [];

export type CommitteeMember = { name: string; termExpires: string };

export type Committee = {
  name: string;
  description: string;
  meets: string;
  members: CommitteeMember[];
};

export const boardsAndCommittees: Committee[] = [];
