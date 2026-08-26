// Real content — from the hopemaine.org "How Do I...?" page export
// (2026-08-26). Answers are condensed from the original page; fees, rules,
// and deadlines are reproduced as written. Linked forms are noted in the
// answer text but their PDF hrefs weren't resolvable in the export.

export type Faq = {
  question: string;
  category: string;
  answer: string[];
  links?: { label: string; href: string }[];
};

export const faqCategories = [
  "Vehicles & Registration",
  "Licenses & Vital Records",
  "Property & Permits",
  "Town Government",
  "Community Services",
];

export const faqs: Faq[] = [
  {
    question: "How do I register a car?",
    category: "Vehicles & Registration",
    answer: [
      "We are agents of the Bureau of Motor Vehicles (BMV) here at the Hope Town Office. We do NEW registrations for vehicles new (and new to you), and re-registrations for your annual renewal. Many re-registrations can be done online.",
      "If you have previously registered your car in Hope, you will need proof of current insurance coverage, current mileage, and payment for excise tax, agent fee, and state registration.",
      "If you have previously registered in Maine but not in Hope, you will also need your prior registration.",
      "If your car was previously registered out of state, you will need your prior registration, proof of insurance, current mileage, and payment for excise tax, agent fee, title fee, and state registration.",
      "For a new car from a Maine dealer: proof of insurance, bill of sale (invoice), temporary registration, blue title application form from the dealer, window sticker (for brand new cars), and payment for excise tax, agent fee, and state registration.",
      "For an out-of-state or private sale: VIN; make, model, year, and color; proof of insurance; bill of sale; window sticker (if brand new); prior title; and payment for excise tax, agent fee, sales tax, title fee, and state registration.",
      "A word about excise tax: we collect excise tax here whether you register with us or at a BMV office. To register at a Motor Vehicle Branch Office (for example, to avoid the $5 agent fee on a re-registration), you must first come to the Town Office to pay the excise tax.",
    ],
    links: [
      { label: "Renew online (Rapid Renewal)", href: "https://www1.maine.gov/online/bmv/rapid-renewal/" },
      { label: "Find a BMV office", href: "https://www.maine.gov/sos/bmv/locations/" },
      { label: "BMV vehicle title page", href: "https://www.maine.gov/sos/bmv/titles/titleapp.html" },
    ],
  },
  {
    question: "How do I register a trailer?",
    category: "Vehicles & Registration",
    answer: [
      "There is no excise tax on trailers unless it is a camper trailer or is ever used for sleeping (such as a horse trailer).",
      "State registration fees (one year / two years): trailer up to 2,000 lbs registered weight — $10.50 / $21. Trailer 2,000 lbs and over — $20 / $40.",
      "New registration from a dealer: bill of sale, blue title application (if over 3,000 lbs net weight — no title needed under 3,000 lbs), registration fee, excise tax if applicable, and a $6 agent fee.",
      "New registration from a private sale: signed bill of sale; title if model year 1995 or newer and over 3,000 lbs net weight, signed over to the new owner; sales tax (5.5% of purchase price); registration fee; and a $6 agent fee.",
      "Re-registration: excise tax if applicable, state registration fee, and a $5 agent fee.",
      "You may register a boat or utility trailer for one or two years. A camper trailer may be registered for only one year.",
    ],
  },
  {
    question: "How do I register a boat?",
    category: "Vehicles & Registration",
    answer: [
      "New registrations must be done at the Town Office. Re-registrations may be done at the Town Office or online.",
      "For new registrations you will need: bill of sale; the Maine registration numbers on the boat if it was ever registered in Maine; state sales tax on the purchase price if it was a private sale (for dealer sales, sales tax is collected at the time of sale); excise tax, computed on the boat's age, length, and engine horsepower; the state registration fee, based on engine horsepower; and a $1.00 agent fee.",
      "For renewals you will need: a copy of the prior registration or the Maine registration numbers on the boat; excise tax; the state registration fee; and a $1.00 agent fee.",
      "All boat registrations expire on December 31.",
    ],
    links: [
      { label: "Re-register your boat online", href: "https://www5.informe.org/online/boat/" },
      {
        label: "State boat registration fees",
        href: "https://www.maine.gov/ifw/fishing-boating/boating/index.html#boatregistrationfees",
      },
      {
        label: "Maine Boating Laws and Responsibilities",
        href: "https://www.boat-ed.com/assets/pdf/handbook/me_handbook_entire.pdf",
      },
    ],
  },
  {
    question: "How do I register a snowmobile?",
    category: "Vehicles & Registration",
    answer: [
      "New registrations must be done at the Town Office. Re-registrations may be done at the Town Office or online.",
      "Maine residents — new registration: bring the bill of sale. You will pay state sales tax on the purchase price if it was a private sale (dealer sales collect it at time of sale), plus $60.00 ($55.00 state registration fee and $5.00 town agent fee).",
      "Maine residents — renewal: bring a copy of the prior registration and pay $60.00 ($55.00 state, $5.00 agent fee).",
      "Non-residents: bring an old registration or bill of sale. 3-day registration $79; 10-day $104; seasonal $124 (each including the $5 agent fee).",
      "All snowmobile registrations expire on June 30. Renewals cannot be done until the fall (usually October), when we receive the new stickers from the state.",
    ],
    links: [
      { label: "Re-register online", href: "https://www10.informe.org/ifw/atv-snow/" },
      {
        label: "Maine ATV and Snowmobile Laws",
        href: "https://www.maine.gov/ifw/docs/23-MDIFW-23-ATV-SNOWMOBILE-2023-24.pdf",
      },
    ],
  },
  {
    question: "How do I register an ATV?",
    category: "Vehicles & Registration",
    answer: [
      "New registrations must be done at the Town Office. Re-registrations may be done at the Town Office or online.",
      "Maine residents — new registration: bring the bill of sale. You will pay state sales tax (5.5%) on the purchase price if it was a private or out-of-state sale, plus $75.00 ($70.00 state registration fee and $5.00 town agent fee).",
      "Maine residents — renewal: bring a copy of the prior registration and pay $75.00 ($70.00 state, $5.00 agent fee).",
      "Non-residents: bring an old registration or bill of sale. 7-day registration $105; seasonal $120 (each including the $5 agent fee).",
      "All ATV registrations expire on June 30.",
    ],
    links: [
      { label: "Re-register online", href: "https://www10.informe.org/ifw/atv-snow/" },
      {
        label: "Maine ATV and Snowmobile Laws",
        href: "https://www.maine.gov/ifw/docs/23-MDIFW-23-ATV-SNOWMOBILE-2023-24.pdf",
      },
    ],
  },
  {
    question: "How do I get a hunting or fishing license?",
    category: "Licenses & Vital Records",
    answer: [
      "You may purchase a hunting or fishing license at the Town Office or online. Licenses are issued to both residents and non-residents of Maine.",
      "You must be a resident of Maine for at least three months to qualify for a resident's license, and your vehicle registration and driver's license must be issued by the State of Maine.",
      "For both new and renewal hunting or archery licenses, you must bring evidence of a previous hunting or archery license, or a Hunter Safety Card.",
    ],
    links: [
      { label: "Purchase online", href: "https://moses.informe.org/cgi-bin/online/moses_v3/index" },
      { label: "Fees and regulations (Maine IF&W)", href: "http://www.maine.gov/ifw/" },
    ],
  },
  {
    question: "How do I license my dog?",
    category: "Licenses & Vital Records",
    answer: [
      "All dogs need to be licensed upon reaching the age of 6 months, or after the dog has been with the family for 10 days if older than 6 months.",
      "Please bring your dog's current Maine rabies certificate. If we already have a current rabies certificate number on file, you do not need to bring it when you renew. If it is the first time licensing in Hope and your dog is spayed or neutered, please bring the spay or neutering certificate.",
      "Costs: spayed or neutered dogs $6.00/year; all other dogs $11.00/year.",
      "Renewals for the next year can be done any time after October 15 and are due by December 31. After January 31 a state-mandated $25 penalty is assessed for late payment, in addition to the license fee.",
      "Online licensing is only available between October 15 and January 31.",
    ],
    links: [
      { label: "License your dog online", href: "https://www1.maine.gov/cgi-bin/online/dog_license/index.pl" },
    ],
  },
  {
    question: "How do I get a copy of a birth certificate?",
    category: "Licenses & Vital Records",
    answer: [
      "The Town Office has official birth records for children born in Hope, or those whose mother lived in Hope at the time of the child's birth.",
      "The cost of a certified birth certificate is $15 for the first copy and $6 for each additional copy purchased at the same time. If you call ahead (763-4199), we will try to have the copies ready when you come in.",
      "Maine law requires anyone requesting a birth record less than 75 years old to provide documentation establishing a direct and legitimate interest in the record. Those who may access such records include: the person named on the record; their spouse or registered domestic partner; the parent(s) named on the record; descendants of the person named; a legal custodian, guardian, or conservator or authorized representative; and genealogists with a Maine CDC researcher identification card.",
      "A brief application must be completed and presented with positive photo identification. Identification requirements apply whether requested in person or by mail.",
    ],
    links: [
      {
        label: "Maine CDC vital records information",
        href: "http://www.maine.gov/dhhs/mecdc/public-health-systems/data-research/vital-records/index.shtml",
      },
    ],
  },
  {
    question: "How do I get a marriage license?",
    category: "Licenses & Vital Records",
    answer: [
      "Marriage licenses are issued by appointment only. Please call the Town Office at 763-4199 to make an appointment. Both parties must be present.",
      "An Intentions of Marriage form must be completed in black ink or typed and filed; a marriage license can then be issued immediately. There is no waiting period.",
      "A certified copy of a divorce decree or death certificate is needed for those who have been previously married. Both parties must sign the actual license in the Town Clerk's presence before it can be issued.",
      "Maine residents must file in the municipality where at least one party resides. Non-residents of Maine can file their Intentions of Marriage in any municipal office. Once issued, both residents and non-residents may marry anywhere within the State of Maine.",
      "The fee for a marriage license is $40 and the license is good for 90 days.",
      "Marriage officiants are available if you would like to have a marriage ceremony — please contact the Town Office for more information.",
    ],
  },
  {
    question: "How do I get a copy of a marriage certificate?",
    category: "Licenses & Vital Records",
    answer: [
      "The marriage certificate is on file in the municipality where the marriage license was issued, and in Augusta.",
      "The cost of a certified copy is $15 for the first copy and $6 for each additional copy purchased at the same time. If you call ahead (763-4199), we will try to have the copies ready when you come in.",
      "Maine law requires anyone requesting a marriage record less than 50 years old to provide documentation establishing a direct and legitimate interest in the record, and to present positive photo identification.",
    ],
    links: [
      {
        label: "Maine CDC vital records information",
        href: "http://www.maine.gov/dhhs/mecdc/public-health-systems/data-research/vital-records/index.shtml",
      },
    ],
  },
  {
    question: "How do I get a copy of a death certificate?",
    category: "Licenses & Vital Records",
    answer: [
      "The Town Office has official death records for anyone who died in Hope, or whose residence was Hope at the time of their death.",
      "The cost of a certified death certificate is $15 for the first copy and $6 for each additional copy purchased at the same time. If you call ahead (763-4199), we will try to have the copies ready when you come in.",
      "Maine law requires anyone requesting a death record less than 25 years old to provide documentation establishing a direct and legitimate interest in the record, and to present positive photo identification.",
    ],
    links: [
      {
        label: "Maine CDC vital records information",
        href: "http://www.maine.gov/dhhs/mecdc/public-health-systems/data-research/vital-records/index.shtml",
      },
    ],
  },
  {
    question: "How do I get a building permit?",
    category: "Property & Permits",
    answer: [
      "A building permit is required for all new construction, enlargement, demolition, or alteration larger than 100 square feet. A Building Permit Application must be filled out and the proper fee paid. The Code Enforcement Officer will then issue the permit.",
      "Permits are also required for: internal plumbing; septic system; new driveway; change of use; new sign or change of exterior dimensions of a sign; resumption of use of a lot or structure; mineral extraction, processing and storage; excavation or fill exceeding 75 cubic yards; placement of a mobile home or manufactured housing unit; placement of wharves, piers, and floats (seasonal or permanent); moving or relocating any building, structure, or mobile home; demolition; home occupation; and towers.",
    ],
  },
  {
    question: "How do I get a plumbing permit?",
    category: "Property & Permits",
    answer: [
      "A plumbing permit is required for all internal plumbing work and all septic system work. A Plumbing Application must be filled out and the proper fee paid. The Local Plumbing Inspector will then issue the permit.",
      "Forms available: Plumbing Permit Form HHE-211, Subsurface Wastewater Disposal System Application, and the Plumbing Fee Schedule.",
    ],
  },
  {
    question: "How do I get a septic system permit?",
    category: "Property & Permits",
    answer: [
      "A permit is required for all septic system installation and expansion work. A Subsurface Wastewater Disposal System Application must be filled out and the proper fee paid. The Local Plumbing Inspector will then issue the permit.",
      "Forms available: Subsurface Wastewater Disposal System Application, Subsurface Wastewater Disposal System Fees, and the State of Maine Search for Old Septic Plans.",
    ],
  },
  {
    question: "How do I get a burn permit?",
    category: "Property & Permits",
    answer: [
      "You can get a burn permit online at no charge.",
      "You can also get a burn permit at no charge from: Clarence Keller (Fire Chief), 654 Hatchet Mountain Rd., Hope — 763-4118, or at Rankin's Hardware, Union St., Camden — 236-3275; Samantha Mank (Town Administrator), Hope Town Office, 441 Camden Rd. — 763-4199; Pamela Jordan (Town Clerk), Hope Town Office — 763-4199; Sarah Chapman (Deputy Town Clerk), Hope Town Office — 763-4199.",
    ],
    links: [
      { label: "Get a burn permit online", href: "http://www.wardensreport.com/#!/frontPage" },
      {
        label: "Rules and regulations related to burning",
        href: "https://apps1.web.maine.gov/burnpermit/public/index.html",
      },
      { label: "Maine Wildfire Danger Report", href: "http://mainefireweather.org/" },
    ],
  },
  {
    question: "How do I pay my property taxes?",
    category: "Property & Permits",
    answer: [
      "Copies of tax bills can be found under Tax Bills and Commitment Books.",
      "Tax bills are usually mailed out in late July or early August. Due dates are set each June at the Annual Town Meeting. The due dates for the 2025–2026 year are October 1, 2025 (first half) and April 30, 2026 (second half). Interest begins to accrue on the unpaid balance after those dates.",
      "You can pay your taxes early, make partial payments, or pay a set amount each month, as long as the total amount due is paid by the due date. There is no discount for paying early.",
      "Please have your bill or account number with your payment to ensure proper credit to your account.",
      "You can mail a check or money order to the Town Office at 441 Camden Road, Hope, ME 04847. Payment can be made in person at the Town Office by cash, check, credit card, or debit card — there is a 2.5% fee for using a credit or debit card. We also take card payments over the phone.",
      "You can pay online at the Informe website. There is a 2.99% fee for credit or debit cards, or a flat $2.10 fee if you pay by electronic check.",
    ],
    links: [
      {
        label: "Pay property taxes online",
        href: "https://apps1.web.maine.gov/cgi-bin/ePayment/online/disclaimer?sid=952",
      },
    ],
  },
  {
    question: "How do I purchase a cemetery plot?",
    category: "Property & Permits",
    answer: ["Cemetery plots in Hope Grove Cemetery and Morey Hill Cemetery cost $450 each."],
  },
  {
    question: "How do I get on a committee?",
    category: "Town Government",
    answer: [
      "Pages 4–6 of the most recent Town Report list the dates that terms expire for each of the Town's appointed committees. If you wish to be considered for a committee, fill out an Application for Committee Service and submit it to the Town Administrator.",
      "The Budget Committee and School Committee are elected committees. Nomination papers are available each year in March.",
    ],
  },
  {
    question: "How do I run for office?",
    category: "Town Government",
    answer: [
      "Elections for Town Officials are held on the second Tuesday of each June. Vacancies on the Board of Selectmen, Budget Committee, and School Committee, and for the positions of Road Commissioner and Five-Town CSD Representative are posted in late winter.",
      "Nomination papers can be picked up at the Town Office. Candidates must get at least 25 signatures of qualified voters to be placed on the ballot. Nomination papers must be turned in to the Town Clerk no more than 45 days before the election.",
      "Contact the Town Administrator or Town Clerk for more information.",
    ],
  },
  {
    question: "How do I register to vote?",
    category: "Town Government",
    answer: [
      "Hope residents can register to vote any time at the Town Office, as well as on election days at the polls. You must be a U.S. citizen and at least eighteen years old. Seventeen-year-olds may register if they will be eighteen before the next election. You may also register at the Bureau of Motor Vehicles or by mailing in a special Federal Postcard.",
      "Please bring a photo ID and proof of residency.",
      "If you cannot come to the Town Office, you can register by mail — call the Town Office at 207-763-4199 for assistance. Mail your registration card to: Town of Hope, 441 Camden Rd., Hope, ME 04847.",
    ],
    links: [{ label: "Register to vote online", href: "https://registertovote.sos.maine.gov/" }],
  },
  {
    question: "How do I register a complaint?",
    category: "Town Government",
    answer: [
      "You can get in touch with Town Officials by phone or e-mail.",
      "You can also print the Town of Hope Resident Complaint Form, fill it out, and return it to the Town Office in person, by fax at 763-4195, or by e-mail to admin@hopemaine.org.",
    ],
  },
  {
    question: "How do I manage my household trash?",
    category: "Community Services",
    answer: [
      "Hope is a charter member of Mid-Coast Solid Waste Corporation, along with the towns of Camden, Rockport, and Lincolnville. The facility is a “pay as you throw” station providing recycling and solid waste services to these four towns. Recycling is free.",
      "All trash that is not recyclable must be in yellow Pay-As-You-Throw bags. 33-gallon bags are $15.00 for a package of 5; 20-gallon bags (tall kitchen trash size) are $20.00 for a package of 10.",
      "Bags can be purchased at the Transfer Station, Hope General Store, Western Auto in Lincolnville, Hannaford's, EBS, Rankin's Lumber, Megunticook Market, Maritime Farms in Rockport, French & Brawn, and the four Town Offices (Hope, Lincolnville, Camden, and Rockport).",
      "Mid-Coast Solid Waste Corporation: PO Box 1016, 90 Union Street, Rockport, Maine 04856. Phone 207-236-2467. Manager — David St. Laurent.",
      "Hours: Tuesday through Saturday, 8:00 AM – 4:00 PM. Closed Sundays, Mondays, and holidays.",
    ],
    links: [
      { label: "Mid-Coast Solid Waste Corporation", href: "http://www.midcoastsolidwaste.org/" },
      { label: "Recycling information", href: "http://www.midcoastsolidwaste.org/recycling/" },
    ],
  },
  {
    question: "How do I apply for General Assistance?",
    category: "Community Services",
    answer: [
      "The Town of Hope has a General Assistance program for people in need. If you need help, your city or town is required to take your application for General Assistance. Applications will be taken at the Town Office during regular business hours (Tue, Wed & Fri 8:30–4:30 and Thu 12:00–6:00).",
      "Your city or town is required to have someone available 24 hours a day to take applications in an emergency. If this is an emergency and the office is closed, contact the Knox County Regional Communications Center at 594-0429.",
      "Your city or town must give you a written decision within 24 hours of receiving your application.",
      "If your city or town refuses to take your application, or if you disagree with a decision or have questions, you can call the Maine Department of Health and Human Services toll-free at 1-800-442-6003.",
      "The Town of Hope and the State of Maine have an ordinance describing the rules for the General Assistance program. You can see a copy at the Town Office. This notice is posted pursuant to 22 M.R.S.A. §4303(1).",
    ],
  },
  {
    question: "How do I request military funeral honors?",
    category: "Community Services",
    answer: [
      "Maine veterans are entitled to Military Funeral Honors. Section 578 of the National Defense Authorization Act for fiscal year 2000 requires the Department of Defense to provide, upon request, Military Funeral Honors for eligible veterans.",
      "Any Active Duty, National Guard, Reservist, and Merchant Marine who received an honorable discharge is entitled to an appropriate Military Funeral Honors Ceremony performed by U.S. Military active-duty service members.",
      "The Maine Military Funeral Honors Team can also provide honors to any honorably discharged veteran who was not honored at the time of death — a family member need only call and request this service.",
    ],
    links: [
      {
        label: "Maine Military Funeral Honors",
        href: "https://www.maine.gov/veterans/memorial-cemetery-system/preparing-for-burial/military-funeral-honors.html",
      },
    ],
  },
  {
    question: "How do I report a problem with a road?",
    category: "Community Services",
    answer: [
      "Report a problem with a road through the Town's online reporting form, or contact the Town Office directly.",
    ],
  },
];
