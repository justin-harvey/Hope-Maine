// Real meeting schedules — from the Select Board and Planning Board page
// exports (2026-08-26). Agenda/minutes counts reflect the exported document
// centers; hrefs are PLACEHOLDER because the exports give relative Revize
// paths rather than resolvable URLs.

export const meetingSchedules = [
  {
    board: "Select Board",
    schedule: "Second and fourth Tuesdays of each month, 5:30 PM",
    location: "Hope Town Office",
    note: "All meetings are open to the public. To place an item on the agenda, e-mail admin@hopemaine.org or call (207) 763-4199.",
    recentAgendas: [
      { label: "Select Board Agenda — Aug 25, 2026", href: "#" },
      { label: "Select Board Agenda — Aug 11, 2026", href: "#" },
      { label: "Select Board Agenda — Jul 28, 2026", href: "#" },
      { label: "Select Board Agenda — Jul 14, 2026", href: "#" },
      { label: "Select Board Agenda — Jun 23, 2026", href: "#" },
    ],
  },
  {
    board: "Planning Board",
    schedule: "First Tuesday of each month, 6:30 PM (and other times as needed)",
    location: "Hope Town Office",
    note: "Check the town calendar for the most up-to-date schedule.",
    recentAgendas: [
      { label: "Planning Board Agenda — Jul 16, 2026", href: "#" },
      { label: "Planning Board Agenda — Mar 3, 2026", href: "#" },
      { label: "Planning Board Agenda — Feb 3, 2026", href: "#" },
      { label: "Planning Board Agenda — Jan 6, 2026", href: "#" },
    ],
  },
  {
    board: "Board of Appeals",
    schedule: "PLACEHOLDER — schedule not yet captured",
    location: "Hope Town Office",
    note: "",
    recentAgendas: [],
  },
  {
    board: "Budget Committee",
    schedule: "PLACEHOLDER — schedule not yet captured",
    location: "Hope Town Office",
    note: "",
    recentAgendas: [],
  },
  {
    board: "School Committee",
    schedule: "PLACEHOLDER — schedule not yet captured",
    location: "PLACEHOLDER",
    note: "",
    recentAgendas: [],
  },
  {
    board: "Cemetery Committee",
    schedule: "PLACEHOLDER — schedule not yet captured",
    location: "Hope Town Office",
    note: "",
    recentAgendas: [],
  },
];

// Other Select Board record series available in the town's document center.
export const selectBoardRecords = [
  { label: "Meeting Documents (2026)", count: 15 },
  { label: "Treasurer's & Payroll Warrants (FY27)", count: 23 },
];
