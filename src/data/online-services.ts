// Real list and links — sourced from a full crawl of hopemaine.org
// (provided 2026-08-26). Nearly all "Online Services" pages just forward to
// the relevant Maine state system (BMV, IF&W, informe.org, etc.) rather than
// hosting the transaction on the town site itself, so these link straight
// there too. Two services (property taxes, road problem reports) didn't
// resolve to an external link in the crawl and stay PLACEHOLDER.

export const onlineServices = [
  {
    label: "Renew your vehicle registration",
    href: "https://apps1.web.maine.gov/online/bmv/rapid-renewal/",
  },
  { label: "Pay your property taxes", href: "#" },
  {
    label: "Request an absentee ballot",
    href: "https://www.maine.gov/cgi-bin/online/AbsenteeBallot/index.pl",
  },
  {
    label: "Request a duplicate vehicle registration",
    href: "https://www1.maine.gov/cgi-bin/online/bmv/drrnew/index.pl",
  },
  {
    label: "Request a vehicle registration renewal reminder",
    href: "https://www1.maine.gov/cgi-bin/online/bmv/rapid-renewal/rr-remindme",
  },
  { label: "Re-register your boat", href: "https://www5.informe.org/online/boat/" },
  {
    label: "Re-register your snowmobile or ATV",
    href: "https://moses.informe.org/online/atv_snow/index.htm",
  },
  {
    label: "License your dog",
    href: "https://www1.maine.gov/cgi-bin/online/dog_license/index.pl",
  },
  {
    label: "Purchase a hunting or fishing license",
    href: "https://moses.informe.org/cgi-bin/online/moses_v3/index",
  },
  { label: "Report a problem with a road", href: "#" },
  {
    label: "Get a burn permit",
    href: "https://apps1.web.maine.gov/burnpermit/public/index.html",
  },
  {
    label: "Find a septic system permit",
    href: "https://www1.maine.gov/cgi-bin/online/mecdc/septicplans/index.pl",
  },
];
