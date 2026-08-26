// Generated from the hopemaine.org page exports (2026-08-26). Labels and
// paths are taken verbatim from the live Document Center, so the names here
// match what staff and residents already recognise.
//
// Every href points at the CURRENT Revize-hosted site via LEGACY_DOC_BASE in
// src/lib/documents.ts. That is deliberate: a working link to the existing
// file is worth more than a dead placeholder. When the documents are
// rehosted, change that one constant.

import { doc } from "@/lib/documents";

export type TownDocument = { label: string; href: string };

export type DocumentCategory = {
  category: string;
  description?: string;
  documents: TownDocument[];
};

export const documentCategories: DocumentCategory[] = [
  {
    category: "Annual Town Reports",
    description: "The Town's annual report, published each year.",
    documents: [
    { label: "2026 Annual Town Report", href: doc("Documents/Town Reports/2026 Annual Town Report.pdf") },
    { label: "2025 Annual Town Report", href: doc("Documents/Town Reports/2025 Annual Town Report.pdf") },
    { label: "2024 Annual Town Report", href: doc("Documents/Town Reports/2024 Annual Town Report.pdf") },
    { label: "2023 Annual Town Report", href: doc("Documents/Town Reports/2023 Annual Town Report.pdf") },
    { label: "2022 Annual Town Report", href: doc("Documents/Town Reports/2022 Annual Town Report.pdf") },
    { label: "2021 Annual Town Report", href: doc("Documents/Town Reports/2021 Annual Town Report.pdf") },
    { label: "2020 Annual Town Report", href: doc("Documents/Town Reports/2020 Annual Town Report.pdf") },
    { label: "2019 Annual Town Report", href: doc("Documents/Town Reports/2019 Annual Town Report.pdf") },
    { label: "2018 Annual Town Report", href: doc("Documents/Town Reports/2018 Annual Town Report.pdf") },
    { label: "2017 Annual Town Report", href: doc("Documents/Town Reports/2017 Annual Town Report.pdf") },
    { label: "2016 Annual Town Report", href: doc("Documents/Town Reports/2016 Annual Town Report.pdf") },
    { label: "2015 Annual Town Report", href: doc("Documents/Town Reports/2015 Annual Town Report.pdf") },
    ],
  },
  {
    category: "Ordinances",
    description: "Ordinances adopted by the Town of Hope.",
    documents: [
    { label: "Active Duty Military Personnel Vehicle Excise Tax Exemption Ordinance", href: doc("Documents/Ordinance/Active_Duty_Military_Personnel_Vehicle_Excise_Tax_Exemption_Ordinance_6.13.19.pdf") },
    { label: "Addressing Ordinance", href: doc("Documents/Ordinance/Addressing_Ordinance_6.14.11.pdf") },
    { label: "Board of Assessment Review Ordinance", href: doc("Documents/Ordinance/Board_of_Assessment_Review_ordinance_11.7.06.pdf") },
    { label: "Cable Television Ordinance", href: doc("Documents/Ordinance/Cable_Television_Ordinance_2.1.1990.pdf") },
    { label: "Capital Planning Committee Ordinance", href: doc("Documents/Ordinance/Capital_Planning_Committee_ordinance_1.28.08.pdf") },
    { label: "Comprehensive Plan", href: doc("Documents/Ordinance/Comprehensive_Plan_11.3.1992.pdf") },
    { label: "Comprehensive Plan - Special Excerpted Edition", href: doc("Documents/Ordinance/Comprehensive_Plan_Special_Excerpted_Edition.pdf") },
    { label: "Emergency Management Ordinance", href: doc("Documents/Ordinance/EMA_Ordinance.pdf") },
    { label: "Floodplain Management Ordinance", href: doc("Documents/Ordinance/Floodplain_Management_Ordinance_6.14.04.pdf") },
    { label: "Land Use Ordinance", href: doc("Documents/Ordinance/Hope_Land_Use_Ordinance_-_8.13.24.pdf") },
    { label: "Local Food and Community Self-Governance Ordinance", href: doc("Documents/Ordinance/Local_Food_and_Community_Self-Governance_Ordinance.pdf") },
    { label: "Parking Ordinance", href: doc("Documents/Ordinance/Parking_Ordinance_8.6.02.pdf") },
    { label: "Planning Board Ordinance", href: doc("Documents/Ordinance/Planning Board Ordinance - Ordinances.pdf") },
    { label: "Powers of Municipal Boards and Commissions When Vacancies Exist Ordinance", href: doc("Documents/Ordinance/Powers_of_Municipal_Boards_and_Commissions_When_Vacancies_Exist_Ordinance_6.12.07.pdf") },
    { label: "Property Assessed Clean Energy (PACE) Ordinance", href: doc("Documents/Ordinance/PACE_Ordinance_6.14.11.pdf") },
    { label: "Recall Ordinance in the Town of Hope, Maine 04847", href: doc("Documents/Ordinance/Recall_Ordinance_in_the_of_Hope_Maine_04847_11.3.20.pdf") },
    { label: "Shoreland Zone Ordinance", href: doc("Documents/Ordinance/Shoreland_Zone_Ordinance_8.13.24.pdf") },
    { label: "Subdivision Ordinance", href: doc("Documents/Ordinance/Subdivision_Ordinance_-_11.4.08.pdf") },
    { label: "Zoning Board of Appeals Ordinance", href: doc("Documents/Ordinance/Zoning_Board_of_Appeals_ordinance_11.7.06.pdf") },
    { label: "Fire Department Ordinance 06.12.25", href: doc("Documents/Ordinance/Fire Department Ordinance 06.12.25.pdf") },
    { label: "General Assistance Ordinance 8.8.17", href: doc("Documents/Ordinance/General_Assistance_Ordinance_8.8.17.pdf") },
    { label: "2025-2026 General Assistance Overall Maximums", href: doc("Documents/Ordinance/2025-2026 General Assistance Overall Maximums .pdf") },
    ],
  },
  {
    category: "Policies",
    description: "Policies adopted by the Select Board.",
    documents: [
    { label: "Emergency Operations Plan Policy", href: doc("Documents/Policies/Hope_EOP_4.10.18.pdf") },
    { label: "Hope Chest Policy", href: doc("Documents/Policies/Hope_Chest_Policy_9.26.2017.pdf") },
    { label: "Human Burial on Privately Owned Land", href: doc("Documents/Policies/Human_Burial_on_Privately_Owned_Land.pdf") },
    { label: "Municipal Building Use Policy", href: doc("Documents/Policies/Municipal_Building_Use_Policy_2.13.18.pdf") },
    { label: "Real Estate Property Tax Poverty Abatement Policy", href: doc("Documents/Policies/Property_Tax_Poverty_Abatement_Policy_7.1.2009.pdf") },
    { label: "Returned Check Policy", href: doc("Documents/Policies/Returned_Check_Policy_6.11.2009.pdf") },
    { label: "Sand & Salt Shed Use Policy", href: doc("Documents/Policies/Salt__Sand_Shed_and_Sand_Use_Policy_2.28.2017.pdf") },
    { label: "Town Boards & Committees Policy", href: doc("Documents/Policies/Town_Boards_and_Committees_Policy_3.14.2006.pdf") },
    { label: "Town Office Hours Policy", href: doc("Documents/Policies/Town_Office_Hours_Policy_3.23.2021.pdf") },
    { label: "Town Office Materials & Information Fees Policy", href: doc("Documents/Policies/Town_Office_Material_and_Information_Fee_Schedule_1.1.2022.pdf") },
    { label: "Veterans Memorial Sign Policy", href: doc("Documents/Policies/Veterans_Memorial_Sign_Policy_11.8.2016.pdf") },
    ],
  },
  {
    category: "Audited Financial Statements",
    description: "Annual audited financial statements for the Town.",
    documents: [
    { label: "Fiscal Year 2023", href: doc("Documents/Audit Finances/Audit FY 2023.pdf") },
    { label: "Fiscal Year 2021", href: doc("Documents/Audit Finances/Audit_FY_2021.pdf") },
    { label: "Fiscal Year 2020", href: doc("Documents/Audit Finances/Audit_FY_2020.pdf") },
    { label: "Fiscal Year 2019", href: doc("Documents/Audit Finances/Audit_FY_2019_600_dpi.pdf") },
    { label: "Fiscal Year 2018", href: doc("Documents/Audit Finances/Audit_FY_2018_600_dpi.pdf") },
    { label: "Fiscal Year 2017", href: doc("Documents/Audit Finances/Audit_FY_2017_600dpi.pdf") },
    { label: "Fiscal Year 2016", href: doc("Documents/Audit Finances/Audit_FY2016_400dpi.pdf") },
    { label: "Fiscal Year 2015", href: doc("Documents/Audit Finances/Audit_FY_2015_400dpi.pdf") },
    { label: "Fiscal Year 2014", href: doc("Documents/Audit Finances/Audit_FY2014_400dpi.pdf") },
    ],
  },
  {
    category: "Budget Summary & Comparison",
    description: "Year-on-year budget comparisons.",
    documents: [
    { label: "Fiscal Year 2021", href: doc("Documents/Audit Finances/W28_BUDGET_COMPARISON.pdf") },
    { label: "Fiscal Year 2022", href: doc("Documents/Audit Finances/FINAL_BUDGET_COMPARISON_pie_3.8.22.pdf") },
    { label: "Fiscal Year 2020", href: doc("Documents/Audit Finances/W30_BUDGET_COMPARISON_pieFY2020.pdf") },
    { label: "Fiscal Year 2019", href: doc("Documents/Audit Finances/W27_BUDGET_COMPARISON_pie.pdf") },
    { label: "Fiscal Year 2018", href: doc("Documents/Audit Finances/W28_BUDGET_COMPARISON_pie_FY2018.pdf") },
    { label: "Fiscal Year 2017", href: doc("Documents/Audit Finances/W29_BUDGET_COMPARISON_fy17_pie.pdf") },
    { label: "Fiscal Year 2016", href: doc("Documents/Audit Finances/W29_BUDGET_COMPARISON_2015_pie.pdf") },
    { label: "Fiscal Year 2015", href: doc("Documents/Audit Finances/W27_BUDGET_COMPARISON_2014_pie.pdf") },
    ],
  },
  {
    category: "Hope Elementary School Audit",
    description: "Audited financial statements for the school.",
    documents: [
    { label: "FY2023", href: doc("Documents/Audit Finances/2023 Hope School Audit.pdf") },
    { label: "FY 2021", href: doc("Documents/Audit Finances/2021_Hope_School_Financial_Statements.pdf") },
    ],
  },
  {
    category: "Tax Maps",
    description: "Tax map sheets and index.",
    documents: [
    { label: "Hope Index 2024", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_INDEX.pdf") },
    { label: "MAP 1", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_01.pdf") },
    { label: "MAP 2", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_02.pdf") },
    { label: "MAP 3", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_03.pdf") },
    { label: "MAP 4", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_04.pdf") },
    { label: "MAP 5", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_05.pdf") },
    { label: "MAP 6", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_06.pdf") },
    { label: "MAP 7", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_07.pdf") },
    { label: "MAP 8", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_08.pdf") },
    { label: "MAP 9", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_09.pdf") },
    { label: "MAP 10", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_10.pdf") },
    { label: "MAP 11", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_11.pdf") },
    { label: "MAP 12", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_12.pdf") },
    { label: "MAP 13", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_13.pdf") },
    { label: "MAP 14", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_14.pdf") },
    { label: "MAP 15", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_15.pdf") },
    { label: "MAP 16", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_16.pdf") },
    { label: "MAP 17", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_17.pdf") },
    { label: "MAP 18", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_18.pdf") },
    { label: "MAP 19", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_19.pdf") },
    { label: "MAP 20", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_20.pdf") },
    { label: "MAP 21", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_21.pdf") },
    { label: "MAP 22", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_22.pdf") },
    { label: "MAP 23", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_23.pdf") },
    { label: "MAP 24", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_24.pdf") },
    { label: "MAP 25", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_25.pdf") },
    { label: "MAP 26", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_26.pdf") },
    { label: "MAP 27", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_27.pdf") },
    { label: "MAP 28", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_28.pdf") },
    { label: "MAP 29", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_29.pdf") },
    { label: "MAP 30", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_30.pdf") },
    { label: "MAP 31", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_31.pdf") },
    { label: "MAP 32", href: doc("Documents/Tax Maps and Other Maps/Tax Maps/HOPE_SHEET_32.pdf") },
    ],
  },
  {
    category: "Street & Zoning Maps",
    description: "Street map and official zoning map.",
    documents: [
    { label: "Hope Street Map", href: doc("Documents/Tax Maps and Other Maps/HopeStreetMap.pdf") },
    { label: "Official Zoning Map 7.20.23", href: doc("Documents/Tax Maps and Other Maps/Zoning Map/Official_Zoning_Map_7.20.23.pdf") },
    ],
  },
  {
    category: "Permits, Forms & Applications",
    description: "Permit applications, fee schedules, vital records requests, and other forms.",
    documents: [
    { label: "Long Term Trailer Plates", href: doc("Documents/How Do I/DOC300.pdf") },
    { label: "Birth Certificate request form", href: doc("Documents/How Do I/Birth_Certificate_request_form.pdf") },
    { label: "Marriage Intentions Fillable form 2023", href: doc("Documents/How Do I/MC_VS2-AMarriageIntentions_Fillable_2023.pdf") },
    { label: "Death Certificate request form", href: doc("Documents/How Do I/Death_Certificate_request_form.pdf") },
    { label: "Building Permit Application", href: doc("Documents/How Do I/Building_Permit_Application.pdf") },
    { label: "Driveway/Entrance Permit Application - State Roads", href: doc("Documents/How Do I/Driveway-Entrance_Permit_-_State_Roads.pdf") },
    { label: "Driveway/Entrance Permit & New Address Application - Town and Private Roads", href: doc("Documents/How Do I/Driveway-Entrance_Permit_-_Town_and_Private_Roads.pdf") },
    { label: "Building and Land Use Permit Fees", href: doc("Documents/How Do I/Building_and_Land_Use_Permit_Fees_2008.pdf") },
    { label: "Plumbing Permit Form HHE-211", href: doc("Documents/How Do I/Plumbing_Permit_Form_HHE-211.pdf") },
    { label: "Subsurface Wastewater Disposal System Application", href: doc("Documents/How Do I/Septic_System_Application_HHE-200.pdf") },
    { label: "State of Maine Search for Old Septic Plans", href: doc("Documents/How Do I/State_of_Maine_search_for_old_septic_plans_rev_4.2018.pdf") },
    { label: "Application for Committee Service", href: doc("Documents/How Do I/Committee_Application.pdf") },
    { label: "General Assistance Application 6.28.24", href: doc("Documents/How Do I/General_Assistance_Application_6.28.24.pdf") },
    { label: "General Assistance Overall Maximums 2024-25", href: doc("Documents/How Do I/General_Assistance_Overall_Maximums_2024-25.pdf") },
    { label: "Town of Hope Resident Complaint Form", href: doc("Documents/How Do I/Complaint_Form.pdf") },
    ],
  },
];
