// Real meeting schedules — from the Select Board and Planning Board page
// exports (2026-08-26). Agenda/minutes counts reflect the exported document
// centers. Agenda hrefs point at the files on the current host — see
// src/lib/documents.ts.
//
// The Aug 25 Select Board agenda genuinely lives under a "School Committee"
// folder on hopemaine.org. The path is reproduced verbatim rather than
// corrected, because that is where the file actually is.

import { doc } from "@/lib/documents";

export const meetingSchedules = [
  {
    board: "Select Board",
    schedule: "Second and fourth Tuesdays of each month, 5:30 PM",
    location: "Hope Town Office",
    note: "All meetings are open to the public. To place an item on the agenda, e-mail admin@hopemaine.org or call (207) 763-4199.",
    recentAgendas: [
      { label: "Select Board Agenda — Aug 25, 2026", href: doc("Government/School Committee/2026/Agendas/SB Agenda 08.25.26.pdf") },
      { label: "Select Board Agenda — Aug 11, 2026", href: doc("Government/Select Board/Agendas/2026/SB Agenda 08.11.26.pdf") },
      { label: "Select Board Agenda — Jul 28, 2026", href: doc("Government/Select Board/Agendas/2026/SB Agenda 07.28.26.pdf") },
      { label: "Select Board Agenda — Jul 14, 2026", href: doc("Government/Select Board/Agendas/2026/SB Agenda 07.14.26.pdf") },
      { label: "Select Board Agenda — Jun 23, 2026", href: doc("Government/Select Board/Agendas/2026/SB Agenda 06.23.26.pdf") },
    ],
  },
  {
    board: "Planning Board",
    schedule: "First Tuesday of each month, 6:30 PM (and other times as needed)",
    location: "Hope Town Office",
    note: "Check the town calendar for the most up-to-date schedule.",
    recentAgendas: [
      { label: "Planning Board Agenda — Jul 16, 2026", href: doc("Government/Planning Board/Agendas/2026/PB Agenda 07.16.26.pdf") },
      { label: "Planning Board Agenda — Mar 3, 2026", href: doc("Government/Planning Board/Agendas/2026/PB Agenda 03.03.26.pdf") },
      { label: "Planning Board Agenda — Feb 3, 2026", href: doc("Government/Planning Board/Agendas/2026/PB Agenda 02.03.26.pdf") },
      { label: "Planning Board Agenda — Jan 6, 2026", href: doc("Government/Planning Board/Agendas/2026/PB Agenda 01.06.26.pdf") },
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
