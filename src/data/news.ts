// Real content — from the hopemaine.org newslist and news_detail page
// exports (2026-08-26). Dates come from the newslist index, which shows
// month/day only; years are inferred from each article's body text.
// Attached PDFs/images are noted in `documents` but hrefs are PLACEHOLDER —
// the exports give relative Revize paths, not resolvable URLs.

export type NewsPost = {
  title: string;
  date: string;
  summary: string;
  body?: string[];
  documents?: { label: string; href: string }[];
};

export const newsPosts: NewsPost[] = [
  {
    title: "MCSW Fee Increase Notice",
    date: "Sep 22, 2026",
    summary:
      "Mid-Coast Solid Waste Corporation public notice regarding an increase to MSW and Pay-As-You-Throw fees.",
    documents: [{ label: "MCSWC Public Notice — MSW and PAYT Fee Increase", href: "#" }],
  },
  {
    title: "Annual Special Town Meeting",
    date: "Aug 20, 2026",
    summary:
      "The Annual Special Town Meeting will be held Thursday, August 20, 2026 at 6:00 p.m. at the Hope Corner Fire Station.",
    body: [
      "The Hope Select Board will hold an informational discussion time during the Select Board Meeting on August 11, 2026 at 5:30 p.m.",
      "The Hope Select Board will hold a Public Hearing to hear public comment and questions regarding the Annual Special Town Meeting Warrant Articles. The Public Hearing will take place at the Hope Corner Fire Station on Thursday, August 13, 2026 at 6:00 p.m.",
      "The Annual Meeting will be held on Thursday, August 20, 2026 at 6:00 p.m. at the Hope Corner Fire Station.",
    ],
    documents: [
      { label: "Public Hearings Schedule", href: "#" },
      { label: "Public Hearing Notice 08.13.26", href: "#" },
      { label: "Town Meeting Warrant", href: "#" },
      { label: "Proposed 2026-2027 Budget", href: "#" },
      { label: "Proposed Roads Budget Detail", href: "#" },
      { label: "Proposed Equipment Lease Purchase Information", href: "#" },
      { label: "Proposed Equipment List", href: "#" },
      { label: "Final Report from Roads Advisory Committee", href: "#" },
    ],
  },
  {
    title: "Town Reports",
    date: "Aug 14, 2026",
    summary: "Annual Town Reports are available in the Documents & Forms section.",
  },
  {
    title: "Public Hearing",
    date: "Aug 13, 2026",
    summary:
      "Public Hearing on the Annual Special Town Meeting Warrant Articles, Thursday, August 13, 2026 at 6:00 p.m. at the Hope Corner Fire Station.",
    body: [
      "The Hope Select Board will hold an informational discussion time during the Select Board Meeting on August 11, 2026 at 5:30 p.m.",
      "The Hope Select Board will hold a Public Hearing to hear public comment and questions regarding the Annual Special Town Meeting Warrant Articles. The Public Hearing will take place at the Hope Corner Fire Station on Thursday, August 13, 2026 at 6:00 p.m.",
      "The Annual Meeting will be held on Thursday, August 20, 2026 at 6:00 p.m. at the Hope Corner Fire Station.",
    ],
    documents: [
      { label: "Public Hearings Schedule", href: "#" },
      { label: "Public Hearing Notice 08.13.26", href: "#" },
      { label: "Town Meeting Warrant", href: "#" },
      { label: "Proposed 2026-2027 Budget", href: "#" },
    ],
  },
  {
    title: "Election Results",
    date: "Jun 9, 2026",
    summary: "Results from the June 9th election, including State of Maine, Town, and Five Town CSD results.",
    documents: [
      { label: "State of Maine Democratic & Republican Results", href: "#" },
      { label: "Town of Hope Results", href: "#" },
      { label: "Five Town CSD Results", href: "#" },
    ],
  },
  {
    title: "Election Day",
    date: "Jun 9, 2026",
    summary:
      "Voting takes place at the Hope Town Office. Polls are open from 8:00 a.m. until 8:00 p.m.",
    body: [
      "June 9th is election day. Voting will take place at the Hope Town Office. The polls will be open from 8:00 a.m. until 8:00 p.m.",
      "Absentee ballots are available on May 15, 2026. All ballots must be received by the Town Office no later than 8:00 p.m. on June 9, 2026. No ballots will be accepted after 8:00 p.m. on Tuesday, June 9, 2026.",
    ],
    documents: [
      {
        label: "Request an Absentee Ballot (online)",
        href: "https://absenteeballotrequest.sos.maine.gov/",
      },
      { label: "Request an Absentee Ballot (paper)", href: "#" },
      { label: "Notice of Primary Election", href: "#" },
      { label: "Democratic Primary Sample Ballot", href: "#" },
      { label: "Republican Primary Sample Ballot", href: "#" },
      { label: "Five Town CSD Warrant & Notice of Election", href: "#" },
      { label: "Warrant & Notice of Election for June 9th", href: "#" },
    ],
  },
  {
    title: "Public Hearing - Knox County Budget",
    date: "May 14, 2026",
    summary: "Public hearing on the 2026 Knox County Budget.",
    documents: [
      { label: "Notice of Public Hearing", href: "#" },
      { label: "Public Hearing Agenda — 05.14.26", href: "#" },
      { label: "Letters from the Commissioners", href: "#" },
      { label: "2026 Knox County Budget", href: "#" },
    ],
  },
  {
    title: "Special School Budget Town Meeting",
    date: "May 14, 2026",
    summary:
      "The Special Town Meeting for the Hope Elementary School Budget will be held Thursday, May 14, 2026 at 6:00 p.m. in the Hope Elementary School gymnasium.",
    documents: [{ label: "Warrant — HES Special Town Meeting", href: "#" }],
  },
  {
    title: "Accepting Paving Bids",
    date: "Feb 26, 2026",
    summary: "The Town is accepting bids for 2026 paving work.",
    documents: [
      { label: "2026 Paving Bid Specifications", href: "#" },
      { label: "2026 Paving Bid Ad", href: "#" },
    ],
  },
  {
    title: "Accepting Mowing Bids",
    date: "Feb 26, 2026",
    summary: "The Town is accepting bids for 2026 mowing work.",
    documents: [
      { label: "2026 Mowing Specifications", href: "#" },
      { label: "2026 Mowing Bid Ad", href: "#" },
    ],
  },
  {
    title: "Employment Opportunity - Deputy Town Clerk",
    date: "Feb 25, 2026",
    summary: "The Town of Hope is accepting applications for the Deputy Town Clerk position.",
    documents: [
      { label: "Deputy Town Clerk Job Description", href: "#" },
      { label: "Deputy Town Clerk Ad", href: "#" },
      { label: "Employment Application", href: "#" },
    ],
  },
  {
    title: "Principal Search for Hope Elementary School",
    date: "Jan 22, 2026",
    summary:
      "Hope Elementary School is searching for its next Principal and is seeking feedback from staff, parents, and the community.",
    body: [
      "Hope Elementary School is undertaking the search for its next Principal. We are seeking feedback in a number of ways from Staff, Parents, and the Community at large.",
      "Step 1: Share your perspective on the qualities you feel are important for the next Principal to exhibit by completing the feedback form.",
      "Step 2: Attend a community forum on Feb 5th at 6:30 PM in the Hope Elementary School. The forum will be led by Superintendent Carlson and School Committee member Jude Masseur.",
      "Step 3: Volunteer to be a member of the interview committee, composed of 2 school committee members, a staff member, a parent, the Superintendent, and a community member who is not a parent. Interviews will be held Feb 10 and 11 in the evening.",
      "Questions: contact Superintendent Carlson at shawn.carlson@fivetowns.net or call 207-605-7710.",
    ],
    documents: [
      { label: "Call for Participation for Interview Committee", href: "#" },
      { label: "Principal Search Feedback Form", href: "https://forms.gle/DA8c1iU9TvpehaTZ8" },
    ],
  },
];

// Note: hopemaine.org runs events through a Revize calendar widget that the
// content export didn't capture, so there is no events data here yet and no
// events section on the site. Add one when real event data is available.
