// Blank template. Boards, their schedules, and recent agendas are managed in
// the admin (Boards and Meetings collections). This static list is only a
// fallback the public pages use before anything is seeded, so it ships empty.

export type MeetingSchedule = {
  board: string;
  schedule: string;
  location: string;
  note: string;
  recentAgendas: { label: string; href: string }[];
};

export const meetingSchedules: MeetingSchedule[] = [];

// Other record series the town wants to surface on the Meetings page.
export const selectBoardRecords: { label: string; count: number }[] = [];
