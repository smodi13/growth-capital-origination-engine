/**
 * Northstar Workflow Systems: the hypothetical underwriting case.
 *
 * This module is deliberately isolated. It is never imported by the real
 * company universe in `companies.ts`, and an automated test asserts that the
 * name never appears in any real company record.
 */

export const HYPOTHETICAL_NAME = 'Northstar Workflow Systems';

export const HYPOTHETICAL_DISCLOSURE =
  'Northstar Workflow Systems is a hypothetical company created solely for an illustrative underwriting exercise. It is not a real business or investment opportunity.';

export const HYPOTHETICAL_LONG_DISCLOSURE =
  'Northstar Workflow Systems is hypothetical. All operating, financial, and transaction assumptions are illustrative and do not represent an actual company or investment recommendation.';

export const ILLUSTRATIVE_FOOTER = 'All figures are hypothetical and illustrative.';

export const hypotheticalProfile = {
  name: HYPOTHETICAL_NAME,
  description:
    'A B2B enterprise SaaS platform selling workflow orchestration software to mid market and enterprise operations teams. The company sells annual subscriptions with a land and expand motion, has built a modest professional services practice around implementation, and is approaching the scale at which a growth financing decision becomes unavoidable.',
  stage: 'Approaching a Series C equivalent growth financing decision',
  capitalNeed: 20.0,
  /**
   * What the capital is actually for.
   *
   * These are the components of the sizing bridge, not a wish list. Product,
   * sales hiring, international expansion, and working capital are deliberately
   * absent: they are operating drivers already inside the forecast, so listing
   * them here as well would present the same spending twice. Acquisition spend
   * is absent because it is not modelled at all.
   */
  capitalUses: [
    'Refinancing the existing term debt so the new facility sits in first position',
    'Funding the cumulative operating burn produced by the forecast',
    'Servicing interest and amortisation across the modelled period',
    'Holding the minimum liquidity level the structure requires',
    'Original issue discount and closing costs',
  ],
  /** Already inside the operating forecast. Never a separate use of proceeds. */
  operatingDrivers: [
    'Product development across the orchestration and reporting modules',
    'Enterprise sales hiring to move upmarket from the mid market base',
    'International expansion into the United Kingdom and Germany',
    'Working capital to support lengthening enterprise payment terms',
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Assumptions                                                                 */
/* -------------------------------------------------------------------------- */

export const assumptions = {
  beginningArr: 12.0,
  /** Year one ARR growth rate. */
  growthYear1: 0.30,
  /** Percentage points removed from the growth rate in each subsequent year. */
  growthDecay: 0.02,
  netRevenueRetention: 1.10,
  grossRetention: 0.88,
  grossMargin: 0.78,
  /** Operating expense ratios as a percentage of revenue, by forecast year. */
  salesMarketingPct: [0.55, 0.52, 0.48, 0.44, 0.40],
  researchDevelopmentPct: [0.30, 0.28, 0.26, 0.24, 0.22],
  generalAdminPct: [0.18, 0.16, 0.15, 0.14, 0.13],
  capexPctRevenue: 0.02,
  /** Deferred revenue benefit as a share of the annual ARR increase. */
  deferredRevenueBenefitPct: 0.10,
  beginningCash: 8.0,
  existingDebt: 3.0,
  customerCountYear0: 240,
  forecastYears: 5,
} as const;

export const transactionAssumptions = {
  capitalRaised: 20.0,
  refinanceExistingDebt: 3.0,
  entryArrMultiple: 8.0,
  exitArrMultiple: 7.0,
  minimumCashCovenant: 5.0,
} as const;

export const equityCaseAssumptions = {
  newEquity: 20.0,
} as const;

export const creditCaseAssumptions = {
  principal: 20.0,
  cashInterestRate: 0.115,
  pikInterestRate: 0.0,
  originalIssueDiscount: 0.02,
  maturityYears: 5,
  interestOnlyYears: 3,
  /** Annual amortisation as a percentage of original principal after the interest only period. */
  amortisationPctOfPrincipal: 0.05,
} as const;

export const blendedCaseAssumptions = {
  equityComponent: 8.0,
  debtComponent: 12.0,
  cashInterestRate: 0.11,
  pikInterestRate: 0.0,
  originalIssueDiscount: 0.015,
  maturityYears: 5,
  interestOnlyYears: 3,
  amortisationPctOfPrincipal: 0.05,
} as const;

/* -------------------------------------------------------------------------- */
/* Operating model                                                             */
/* -------------------------------------------------------------------------- */

export interface ForecastYear {
  year: number;
  label: string;
  beginningArr: number;
  newArr: number;
  expansionArr: number;
  churnedArr: number;
  endingArr: number;
  arrGrowth: number;
  revenue: number;
  grossProfit: number;
  salesMarketing: number;
  researchDevelopment: number;
  generalAdmin: number;
  totalOpex: number;
  ebitda: number;
  ebitdaMargin: number;
  capex: number;
  deferredRevenueBenefit: number;
  /** Unlevered free cash flow, before any interest or principal. */
  unleveredFcf: number;
  customerCount: number;
  averageContractValue: number;
  revenuePerCustomer: number;
  ruleOf40: number;
  burnMultiple: number | null;
  cacPaybackMonths: number;
}

function round(n: number, dp = 3): number {
  const f = 10 ** dp;
  return Math.round(n * f) / f;
}

export function buildOperatingModel(): ForecastYear[] {
  const years: ForecastYear[] = [];
  let beginningArr: number = assumptions.beginningArr;
  let customerCount: number = assumptions.customerCountYear0;

  for (let i = 0; i < assumptions.forecastYears; i += 1) {
    const growth = assumptions.growthYear1 - assumptions.growthDecay * i;
    const endingArr = beginningArr * (1 + growth);

    // ARR bridge. Churn and expansion are set by the retention assumptions;
    // new ARR is the residual required to reach the growth target.
    const churnedArr = beginningArr * (1 - assumptions.grossRetention);
    const expansionArr =
      beginningArr * (assumptions.netRevenueRetention - assumptions.grossRetention);
    const newArr = endingArr - beginningArr * assumptions.netRevenueRetention;

    const revenue = (beginningArr + endingArr) / 2;
    const grossProfit = revenue * assumptions.grossMargin;

    const salesMarketing = revenue * assumptions.salesMarketingPct[i];
    const researchDevelopment = revenue * assumptions.researchDevelopmentPct[i];
    const generalAdmin = revenue * assumptions.generalAdminPct[i];
    const totalOpex = salesMarketing + researchDevelopment + generalAdmin;
    const ebitda = grossProfit - totalOpex;

    const capex = revenue * assumptions.capexPctRevenue;
    const arrIncrease = endingArr - beginningArr;
    const deferredRevenueBenefit = arrIncrease * assumptions.deferredRevenueBenefitPct;
    const unleveredFcf = ebitda - capex + deferredRevenueBenefit;

    // Customer count grows with new ARR at a rising average contract value.
    const priorAcv = beginningArr / customerCount;
    const newAcv = priorAcv * 1.15;
    const newCustomers = newArr / newAcv;
    const churnedCustomers = customerCount * (1 - assumptions.grossRetention);
    const endingCustomers = customerCount + newCustomers - churnedCustomers;

    // CAC payback in months, blended. Sales and marketing supports both new
    // logos and expansion within the base, so it is recovered against the gross
    // profit on new plus expansion ARR rather than on new ARR alone. Charging
    // the whole S&M line to new ARR only would overstate payback materially.
    const cacPaybackMonths =
      (salesMarketing / ((newArr + expansionArr) * assumptions.grossMargin)) * 12;

    years.push({
      year: i + 1,
      label: `Year ${i + 1}`,
      beginningArr: round(beginningArr),
      newArr: round(newArr),
      expansionArr: round(expansionArr),
      churnedArr: round(churnedArr),
      endingArr: round(endingArr),
      arrGrowth: round(growth, 4),
      revenue: round(revenue),
      grossProfit: round(grossProfit),
      salesMarketing: round(salesMarketing),
      researchDevelopment: round(researchDevelopment),
      generalAdmin: round(generalAdmin),
      totalOpex: round(totalOpex),
      ebitda: round(ebitda),
      ebitdaMargin: round(ebitda / revenue, 4),
      capex: round(capex),
      deferredRevenueBenefit: round(deferredRevenueBenefit),
      unleveredFcf: round(unleveredFcf),
      customerCount: Math.round(endingCustomers),
      averageContractValue: round((endingArr / endingCustomers) * 1000, 1),
      revenuePerCustomer: round((revenue / endingCustomers) * 1000, 1),
      ruleOf40: round(growth * 100 + (ebitda / revenue) * 100, 1),
      burnMultiple: ebitda < 0 ? round(-unleveredFcf / arrIncrease, 2) : null,
      cacPaybackMonths: round(cacPaybackMonths, 1),
    });

    beginningArr = endingArr;
    customerCount = endingCustomers;
  }

  return years;
}

export const forecast = buildOperatingModel();

/* -------------------------------------------------------------------------- */
/* Debt schedule                                                               */
/* -------------------------------------------------------------------------- */

export interface DebtYear {
  year: number;
  openingBalance: number;
  cashInterest: number;
  pikInterest: number;
  amortisation: number;
  debtService: number;
  closingBalance: number;
  /** Debt to ending ARR. */
  leverageArr: number;
  /** EBITDA divided by cash interest. Negative while EBITDA is negative. */
  interestCoverage: number;
  /** (EBITDA less capex) divided by total debt service. */
  dscr: number;
}

export interface DebtTerms {
  principal: number;
  cashInterestRate: number;
  pikInterestRate: number;
  originalIssueDiscount: number;
  maturityYears: number;
  interestOnlyYears: number;
  amortisationPctOfPrincipal: number;
}

export function buildDebtSchedule(terms: DebtTerms): DebtYear[] {
  const rows: DebtYear[] = [];
  let balance = terms.principal;

  for (let i = 0; i < terms.maturityYears; i += 1) {
    const opening = balance;
    const cashInterest = opening * terms.cashInterestRate;
    const pikInterest = opening * terms.pikInterestRate;
    const amortisation =
      i + 1 > terms.interestOnlyYears ? terms.principal * terms.amortisationPctOfPrincipal : 0;
    const closing = opening + pikInterest - amortisation;
    const debtService = cashInterest + amortisation;
    const f = forecast[i];

    rows.push({
      year: i + 1,
      openingBalance: round(opening),
      cashInterest: round(cashInterest),
      pikInterest: round(pikInterest),
      amortisation: round(amortisation),
      debtService: round(debtService),
      closingBalance: round(closing),
      leverageArr: round(closing / f.endingArr, 2),
      interestCoverage: round(cashInterest === 0 ? 0 : f.ebitda / cashInterest, 2),
      dscr: round(debtService === 0 ? 0 : (f.ebitda - f.capex) / debtService, 2),
    });

    balance = closing;
  }

  return rows;
}

/* -------------------------------------------------------------------------- */
/* Cash roll forward                                                           */
/* -------------------------------------------------------------------------- */

export interface CashYear {
  year: number;
  opening: number;
  unleveredFcf: number;
  cashInterest: number;
  amortisation: number;
  closing: number;
  /** Months of runway at the current year burn rate. Null once cash generative. */
  runwayMonths: number | null;
  breachesMinimumCash: boolean;
}

export function buildCashSchedule(
  cashAtClose: number,
  debt: DebtYear[] | null,
): CashYear[] {
  const rows: CashYear[] = [];
  let cash = cashAtClose;

  for (let i = 0; i < forecast.length; i += 1) {
    const opening = cash;
    const f = forecast[i];
    const cashInterest = debt ? debt[i].cashInterest : 0;
    const amortisation = debt ? debt[i].amortisation : 0;
    const net = f.unleveredFcf - cashInterest - amortisation;
    const closing = opening + net;

    rows.push({
      year: i + 1,
      opening: round(opening),
      unleveredFcf: f.unleveredFcf,
      cashInterest: round(cashInterest),
      amortisation: round(amortisation),
      closing: round(closing),
      runwayMonths: net < 0 ? round((closing / -net) * 12, 1) : null,
      breachesMinimumCash: closing < transactionAssumptions.minimumCashCovenant,
    });

    cash = closing;
  }

  return rows;
}

/* -------------------------------------------------------------------------- */
/* IRR                                                                         */
/* -------------------------------------------------------------------------- */

/** Internal rate of return by bisection. Cash flows start at time zero. */
export function irr(cashFlows: number[], lo = -0.95, hi = 5): number {
  const npv = (r: number) => cashFlows.reduce((s, cf, t) => s + cf / (1 + r) ** t, 0);
  let a = lo;
  let b = hi;
  if (npv(a) * npv(b) > 0) return NaN;
  for (let i = 0; i < 200; i += 1) {
    const m = (a + b) / 2;
    if (npv(a) * npv(m) <= 0) b = m;
    else a = m;
  }
  return round((a + b) / 2, 4);
}

/* -------------------------------------------------------------------------- */
/* Structures                                                                  */
/* -------------------------------------------------------------------------- */

export interface StructureResult {
  key: 'equity' | 'credit' | 'blended';
  label: string;
  equityInvested: number;
  debtPrincipal: number;
  preMoneyValuation: number;
  postMoneyValuation: number;
  investorOwnership: number;
  founderDilution: number;
  cashAtClose: number;
  debt: DebtYear[] | null;
  cash: CashYear[];
  endingCash: number;
  endingDebt: number;
  exitEnterpriseValue: number;
  exitEquityValue: number;
  equityInvestorProceeds: number;
  equityMoic: number;
  equityIrr: number;
  debtInvestorOutlay: number;
  debtInvestorMoic: number | null;
  debtInvestorIrr: number | null;
  minimumCashBreachYear: number | null;
  lowestCash: number;
  worstDscr: number;
}

const exitArr = forecast[forecast.length - 1].endingArr;
const exitEv = round(exitArr * transactionAssumptions.exitArrMultiple);

function buildStructure(
  key: StructureResult['key'],
  label: string,
  equityInvested: number,
  debtTerms: DebtTerms | null,
): StructureResult {
  const debt = debtTerms ? buildDebtSchedule(debtTerms) : null;
  const oidCost = debtTerms ? debtTerms.principal * debtTerms.originalIssueDiscount : 0;
  const debtNetProceeds = debtTerms ? debtTerms.principal - oidCost : 0;

  const cashAtClose =
    assumptions.beginningCash +
    equityInvested +
    debtNetProceeds -
    transactionAssumptions.refinanceExistingDebt;

  const cash = buildCashSchedule(cashAtClose, debt);
  const endingCash = cash[cash.length - 1].closing;
  const endingDebt = debt ? debt[debt.length - 1].closingBalance : 0;

  const preMoney = round(assumptions.beginningArr * transactionAssumptions.entryArrMultiple);
  const postMoney = round(preMoney + equityInvested);
  const ownership = equityInvested > 0 ? round(equityInvested / postMoney, 4) : 0;

  const exitEquityValue = round(exitEv + endingCash - endingDebt);
  const equityInvestorProceeds = round(exitEquityValue * ownership);
  const equityMoic = equityInvested > 0 ? round(equityInvestorProceeds / equityInvested, 2) : 0;
  const equityIrr =
    equityInvested > 0
      ? irr([-equityInvested, 0, 0, 0, 0, equityInvestorProceeds])
      : 0;

  let debtInvestorMoic: number | null = null;
  let debtInvestorIrr: number | null = null;
  const debtInvestorOutlay = round(debtNetProceeds);

  if (debt && debtTerms) {
    const flows: number[] = [-debtNetProceeds];
    debt.forEach((d, i) => {
      const isFinal = i === debt.length - 1;
      flows.push(round(d.cashInterest + d.amortisation + (isFinal ? d.closingBalance : 0)));
    });
    const totalReceived = flows.slice(1).reduce((s, v) => s + v, 0);
    debtInvestorMoic = round(totalReceived / debtNetProceeds, 2);
    debtInvestorIrr = irr(flows);
  }

  const breach = cash.find((c) => c.breachesMinimumCash);
  const lowestCash = round(Math.min(...cash.map((c) => c.closing)));
  const worstDscr = debt ? round(Math.min(...debt.map((d) => d.dscr))) : 0;

  return {
    key,
    label,
    equityInvested,
    debtPrincipal: debtTerms ? debtTerms.principal : 0,
    preMoneyValuation: preMoney,
    postMoneyValuation: equityInvested > 0 ? postMoney : preMoney,
    investorOwnership: ownership,
    founderDilution: ownership,
    cashAtClose: round(cashAtClose),
    debt,
    cash,
    endingCash,
    endingDebt,
    exitEnterpriseValue: exitEv,
    exitEquityValue,
    equityInvestorProceeds,
    equityMoic,
    equityIrr,
    debtInvestorOutlay,
    debtInvestorMoic,
    debtInvestorIrr,
    minimumCashBreachYear: breach ? breach.year : null,
    lowestCash,
    worstDscr,
  };
}

export const growthEquityCase = buildStructure(
  'equity',
  'Growth equity',
  equityCaseAssumptions.newEquity,
  null,
);

export const privateCreditCase = buildStructure('credit', 'Private credit', 0, {
  principal: creditCaseAssumptions.principal,
  cashInterestRate: creditCaseAssumptions.cashInterestRate,
  pikInterestRate: creditCaseAssumptions.pikInterestRate,
  originalIssueDiscount: creditCaseAssumptions.originalIssueDiscount,
  maturityYears: creditCaseAssumptions.maturityYears,
  interestOnlyYears: creditCaseAssumptions.interestOnlyYears,
  amortisationPctOfPrincipal: creditCaseAssumptions.amortisationPctOfPrincipal,
});

export const blendedCapitalCase = buildStructure(
  'blended',
  'Blended capital',
  blendedCaseAssumptions.equityComponent,
  {
    principal: blendedCaseAssumptions.debtComponent,
    cashInterestRate: blendedCaseAssumptions.cashInterestRate,
    pikInterestRate: blendedCaseAssumptions.pikInterestRate,
    originalIssueDiscount: blendedCaseAssumptions.originalIssueDiscount,
    maturityYears: blendedCaseAssumptions.maturityYears,
    interestOnlyYears: blendedCaseAssumptions.interestOnlyYears,
    amortisationPctOfPrincipal: blendedCaseAssumptions.amortisationPctOfPrincipal,
  },
);

export const structures: StructureResult[] = [
  growthEquityCase,
  privateCreditCase,
  blendedCapitalCase,
];

/* -------------------------------------------------------------------------- */
/* Sensitivities                                                               */
/* -------------------------------------------------------------------------- */

/** Equity investor MOIC across exit multiples, for a given structure. */
export function exitMultipleSensitivity(
  s: StructureResult,
  multiples: number[] = [5, 6, 7, 8, 9],
): { multiple: number; equityValue: number; moic: number; irr: number }[] {
  return multiples.map((m) => {
    const ev = round(exitArr * m);
    const eq = round(ev + s.endingCash - s.endingDebt);
    const proceeds = round(eq * s.investorOwnership);
    const moic = s.equityInvested > 0 ? round(proceeds / s.equityInvested, 2) : 0;
    return {
      multiple: m,
      equityValue: eq,
      moic,
      irr: s.equityInvested > 0 ? irr([-s.equityInvested, 0, 0, 0, 0, proceeds]) : 0,
    };
  });
}

/** Ending ARR under alternative year one growth rates, holding the decay fixed. */
export function growthSensitivity(
  rates: number[] = [0.2, 0.25, 0.3, 0.35, 0.4],
): { rate: number; endingArr: number; exitEvAt7x: number }[] {
  return rates.map((r) => {
    let arr: number = assumptions.beginningArr;
    for (let i = 0; i < assumptions.forecastYears; i += 1) {
      arr *= 1 + (r - assumptions.growthDecay * i);
    }
    return {
      rate: r,
      endingArr: round(arr),
      exitEvAt7x: round(arr * transactionAssumptions.exitArrMultiple),
    };
  });
}

/** Ending ARR and year five EBITDA under alternative net revenue retention. */
export function retentionSensitivity(
  nrrValues: number[] = [1.0, 1.05, 1.1, 1.15, 1.2],
): { nrr: number; newArrYear1: number; endingArr: number }[] {
  return nrrValues.map((nrr) => {
    let arr: number = assumptions.beginningArr;
    let newArrYear1 = 0;
    for (let i = 0; i < assumptions.forecastYears; i += 1) {
      const g = assumptions.growthYear1 - assumptions.growthDecay * i;
      const ending = arr * (1 + g);
      if (i === 0) newArrYear1 = round(ending - arr * nrr);
      arr = ending;
    }
    return { nrr, newArrYear1, endingArr: round(arr) };
  });
}

/** Year one cash interest and lowest cash balance under alternative rates. */
export function interestRateSensitivity(
  rates: number[] = [0.09, 0.10, 0.11, 0.12, 0.13],
  principal: number = blendedCaseAssumptions.debtComponent,
  equityComponent: number = blendedCaseAssumptions.equityComponent,
): { rate: number; annualCashInterest: number; lowestCash: number; breachYear: number | null }[] {
  return rates.map((rate) => {
    const terms: DebtTerms = {
      principal,
      cashInterestRate: rate,
      pikInterestRate: 0,
      originalIssueDiscount: blendedCaseAssumptions.originalIssueDiscount,
      maturityYears: blendedCaseAssumptions.maturityYears,
      interestOnlyYears: blendedCaseAssumptions.interestOnlyYears,
      amortisationPctOfPrincipal: blendedCaseAssumptions.amortisationPctOfPrincipal,
    };
    const schedule = buildDebtSchedule(terms);
    const netProceeds = principal * (1 - terms.originalIssueDiscount);
    const cashAtClose =
      assumptions.beginningCash +
      equityComponent +
      netProceeds -
      transactionAssumptions.refinanceExistingDebt;
    const cash = buildCashSchedule(cashAtClose, schedule);
    const breach = cash.find((c) => c.breachesMinimumCash);
    return {
      rate,
      annualCashInterest: round(principal * rate),
      lowestCash: round(Math.min(...cash.map((c) => c.closing))),
      breachYear: breach ? breach.year : null,
    };
  });
}

/* -------------------------------------------------------------------------- */
/* Downside case                                                               */
/* -------------------------------------------------------------------------- */

export const downsideAssumptions = {
  growthYear1: 0.18,
  netRevenueRetention: 1.0,
  grossRetention: 0.82,
  grossMargin: 0.74,
  /** Sales and marketing does not fall as fast when growth disappoints. */
  salesMarketingUplift: 0.05,
} as const;

export interface DownsideYear {
  year: number;
  endingArr: number;
  revenue: number;
  ebitda: number;
  unleveredFcf: number;
}

export function buildDownsideModel(): DownsideYear[] {
  const rows: DownsideYear[] = [];
  let arr: number = assumptions.beginningArr;

  for (let i = 0; i < assumptions.forecastYears; i += 1) {
    const growth = downsideAssumptions.growthYear1 - assumptions.growthDecay * i;
    const ending = arr * (1 + growth);
    const revenue = (arr + ending) / 2;
    const grossProfit = revenue * downsideAssumptions.grossMargin;
    const opexPct =
      assumptions.salesMarketingPct[i] +
      downsideAssumptions.salesMarketingUplift +
      assumptions.researchDevelopmentPct[i] +
      assumptions.generalAdminPct[i];
    const ebitda = grossProfit - revenue * opexPct;
    const capex = revenue * assumptions.capexPctRevenue;
    const dr = (ending - arr) * assumptions.deferredRevenueBenefitPct;

    rows.push({
      year: i + 1,
      endingArr: round(ending),
      revenue: round(revenue),
      ebitda: round(ebitda),
      unleveredFcf: round(ebitda - capex + dr),
    });

    arr = ending;
  }

  return rows;
}

export const downsideForecast = buildDownsideModel();

export interface DownsideOutcome {
  label: string;
  endingCash: number;
  lowestCash: number;
  breachYear: number | null;
  survivesFiveYears: boolean;
}

export function downsideOutcome(s: StructureResult): DownsideOutcome {
  let cash = s.cashAtClose;
  let lowest = cash;
  let breachYear: number | null = null;

  downsideForecast.forEach((d, i) => {
    const cashInterest = s.debt ? s.debt[i].cashInterest : 0;
    const amortisation = s.debt ? s.debt[i].amortisation : 0;
    cash = cash + d.unleveredFcf - cashInterest - amortisation;
    if (cash < lowest) lowest = cash;
    if (breachYear === null && cash < transactionAssumptions.minimumCashCovenant) {
      breachYear = i + 1;
    }
  });

  return {
    label: s.label,
    endingCash: round(cash),
    lowestCash: round(lowest),
    breachYear,
    survivesFiveYears: cash > 0,
  };
}

export const downsideOutcomes = structures.map(downsideOutcome);

/* -------------------------------------------------------------------------- */
/* Break even                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * The ARR at which base case unit economics produce zero EBITDA, using the
 * year five cost structure. Solves gross margin times revenue equals opex.
 */
export const breakEven = (() => {
  const y5 = forecast[forecast.length - 1];
  const opexPct =
    assumptions.salesMarketingPct[4] +
    assumptions.researchDevelopmentPct[4] +
    assumptions.generalAdminPct[4];
  const contributionMargin = assumptions.grossMargin - opexPct;
  return {
    year5OpexPctOfRevenue: round(opexPct, 4),
    contributionMargin: round(contributionMargin, 4),
    year5Revenue: y5.revenue,
    year5Ebitda: y5.ebitda,
    /** Revenue at which the year five cost structure breaks even, holding ratios fixed. */
    breakEvenComment:
      contributionMargin > 0
        ? 'Under the year five cost structure the business generates positive contribution at any revenue level, so break even is reached during year five as operating leverage compounds.'
        : 'The year five cost structure does not break even at any revenue level, so further operating leverage is required.',
  };
})();

/* -------------------------------------------------------------------------- */
/* Recommendation                                                              */
/* -------------------------------------------------------------------------- */

export const recommendation = {
  structure: 'Blended capital',
  headline:
    'A blended structure of USD 8 million of primary equity alongside a USD 12 million senior secured facility is the recommended illustrative structure.',
  reasons: [
    {
      title: 'Founder dilution',
      detail: `The blended structure dilutes existing holders by ${(blendedCapitalCase.founderDilution * 100).toFixed(1)} percent against ${(growthEquityCase.founderDilution * 100).toFixed(1)} percent for the all equity case, a saving of ${((growthEquityCase.founderDilution - blendedCapitalCase.founderDilution) * 100).toFixed(1)} percentage points for the same USD 20 million of capital.`,
    },
    {
      title: 'Debt service risk',
      detail: `The all debt case cannot service USD 20 million of principal from operating cash flow. Cash falls to USD ${privateCreditCase.lowestCash.toFixed(1)} million and breaches the USD ${transactionAssumptions.minimumCashCovenant.toFixed(1)} million minimum cash covenant in year ${privateCreditCase.minimumCashBreachYear}. The blended structure never breaches it.`,
    },
    {
      title: 'Cash runway',
      detail: `The blended structure ends year five with USD ${blendedCapitalCase.endingCash.toFixed(1)} million of cash against USD ${privateCreditCase.endingCash.toFixed(1)} million under all debt, while EBITDA turns positive in year five under all three structures.`,
    },
    {
      title: 'Investor return potential',
      detail: `Equity investor MOIC is ${blendedCapitalCase.equityMoic.toFixed(2)}x under the blended structure against ${growthEquityCase.equityMoic.toFixed(2)}x under all equity, because a smaller equity cheque is exposed to the same enterprise value appreciation.`,
    },
    {
      title: 'Downside protection',
      detail:
        'The debt tranche sits ahead of equity and amortises from year four, and the smaller equity cheque limits the capital at risk if growth disappoints. The downside case is the test that separates the structures.',
    },
    {
      title: 'Flexibility',
      detail:
        'A USD 12 million facility leaves headroom for a later upsizing against a larger ARR base, which a USD 20 million facility taken at this scale would not.',
    },
  ],
  caveat:
    'This conclusion is conditional rather than certain. It holds if the company sustains growth close to the base case and if operating leverage arrives on the assumed schedule. Under the downside case the debt component becomes a constraint rather than an advantage, and the analysis below sets out where that boundary sits.',
} as const;

/* -------------------------------------------------------------------------- */
/* Capital sizing bridge                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Why the plan needs USD 20 million.
 *
 * The bridge exists because the raise is larger than the cumulative operating
 * burn, and a reader is entitled to know what the difference is for. It is not
 * a second list of uses sitting alongside the forecast: product, sales,
 * international expansion, and working capital are operating drivers already
 * inside the burn line below, and counting them again here would double count
 * them. Acquisition spend is not modelled at all.
 *
 * Values are taken from the Capital Structures and Downside Case sheets of the
 * supplied workbook, which is the source of truth for every figure here.
 */
export const capitalSizing = {
  lines: [
    {
      label: 'Existing debt refinanced',
      value: 3.0,
      note: 'Repaid at close so the new facility sits in first position.',
    },
    {
      label: 'Base case cumulative operating burn',
      value: 9.0,
      note: 'The full modelled operating plan, including product, sales, international, and working capital.',
    },
    {
      label: 'Base case debt service',
      value: 7.7,
      note: 'Interest and amortisation on the USD 12 million facility across the modelled period.',
    },
    {
      label: 'Minimum ending cash',
      value: 5.0,
      note: 'The liquidity floor the structure is required to hold.',
    },
    {
      label: 'Less beginning cash',
      value: -8.0,
      note: 'Cash already on the balance sheet at close.',
    },
    {
      label: 'OID and financing friction',
      value: 0.2,
      note: 'Original issue discount and closing costs.',
    },
  ],
  baseRequired: 16.9,
  raised: 20.0,
  baseHeadroom: 3.1,
  downsideRequired: 24.6,
  downsideShortfall: 4.6,
  /** Uses that are inside the operating forecast and must not be added again. */
  embeddedInForecast: [
    'Product development',
    'Sales and marketing hiring',
    'International expansion',
    'Working capital',
  ],
  notModelled: ['Acquisition spend'],
} as const;

/* -------------------------------------------------------------------------- */
/* Credit framing                                                              */
/* -------------------------------------------------------------------------- */

/**
 * What kind of debt this is.
 *
 * EBITDA is negative through year four, so debt service coverage never reaches
 * 1.0x inside the modelled period. That rules out a conventional cash flow loan
 * and makes recurring revenue durability, not earnings, the thing the facility
 * is underwritten against.
 */
export const creditFraming = {
  headline: 'Recurring-revenue facility, not a conventional cash-flow loan',
  rationale:
    'EBITDA is negative through year four and debt service coverage stays below 1.0x for the whole modelled period. A lender cannot size this facility on earnings, so it is sized against recurring revenue durability, the liquidity floor, and the quality of the contracted base.',
  mustBeConfirmed: [
    'Contracted ARR against usage and month to month revenue',
    'Gross and net retention at cohort level',
    'Customer concentration across the top ten and top twenty accounts',
    'Monthly cash burn and the minimum liquidity the business actually needs',
  ],
  standingRisks: [
    'DSCR remains below 1.0x throughout the modelled period, so coverage is a warning metric rather than a covenant the business can meet',
    'Refinancing risk at maturity remains material against USD 10.8 million outstanding and USD 1.0 million of year five unlevered free cash flow',
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* Existing holder value                                                       */
/* -------------------------------------------------------------------------- */

/**
 * What each structure leaves with the people who already own the company.
 *
 * Proceeds are computed structure by structure rather than against a shared
 * exit equity value, because the three structures do not share one: each
 * carries different cash and different remaining debt at exit. Comparing them
 * individually is what produces the USD 9.7 million figure that the workbook
 * and the memorandum both carry.
 */
export const existingHolderValue = {
  rows: [
    {
      structure: 'Growth equity',
      ownership: 0.828,
      exitEquityValue: 282.5,
      proceeds: 233.8,
      incrementalVersusAllEquity: 0.0,
    },
    {
      structure: 'Private credit',
      ownership: 1.0,
      exitEquityValue: 250.7,
      proceeds: 250.7,
      incrementalVersusAllEquity: 16.9,
    },
    {
      structure: 'Selected blend',
      ownership: 0.923,
      exitEquityValue: 263.8,
      proceeds: 243.5,
      incrementalVersusAllEquity: 9.7,
    },
  ],
  summary:
    'Relative to the all equity structure, the selected blend increases modelled proceeds to existing holders by approximately USD 9.7 million while reducing dilution from 17.2 percent to 7.7 percent. Each structure is compared on its own exit equity value, because the cash and the remaining debt at exit differ across the three.',
} as const;

/* -------------------------------------------------------------------------- */
/* Equity and debt mix sensitivity                                             */
/* -------------------------------------------------------------------------- */

export type MixStatus = 'FAIL' | 'BREACH' | 'HEADROOM';

/**
 * The same USD 20 million split six ways.
 *
 * The tension this table exposes is the most useful thing in the underwriting.
 * The recommended 8 / 12 blend maximises base case returns and does not
 * preserve the minimum cash level in the downside. Both facts are shown.
 */
export const mixSensitivity: {
  equity: number;
  debt: number;
  dilution: number;
  baseYear5Cash: number;
  downsideYear5Cash: number;
  status: MixStatus;
  selected: boolean;
}[] = [
  { equity: 0, debt: 20, dilution: 0.0, baseYear5Cash: 2.9, downsideYear5Cash: -4.8, status: 'FAIL', selected: false },
  { equity: 4, debt: 16, dilution: 0.04, baseYear5Cash: 5.5, downsideYear5Cash: -2.2, status: 'FAIL', selected: false },
  { equity: 8, debt: 12, dilution: 0.077, baseYear5Cash: 8.1, downsideYear5Cash: 0.4, status: 'BREACH', selected: true },
  { equity: 12, debt: 8, dilution: 0.111, baseYear5Cash: 10.8, downsideYear5Cash: 3.1, status: 'BREACH', selected: false },
  { equity: 16, debt: 4, dilution: 0.143, baseYear5Cash: 13.4, downsideYear5Cash: 5.7, status: 'HEADROOM', selected: false },
  { equity: 20, debt: 0, dilution: 0.172, baseYear5Cash: 16.0, downsideYear5Cash: 8.4, status: 'HEADROOM', selected: false },
];

export const MIX_STATUS_MEANING: Record<MixStatus, string> = {
  FAIL: 'The downside case runs out of cash entirely.',
  BREACH: 'The downside case survives but falls through the USD 5.0 million minimum cash level.',
  HEADROOM: 'The downside case preserves the minimum cash level throughout.',
};

export const mixConclusion = {
  selected:
    'The USD 8 million equity and USD 12 million debt structure is the preliminary base case recommendation because it balances dilution against base case liquidity: it holds dilution at 7.7 percent and still ends year five with USD 8.1 million of cash.',
  tension:
    'It does not preserve the USD 5.0 million minimum cash level in the modelled downside case. Downside year five cash is USD 0.4 million and the threshold is breached in year four.',
  threshold:
    'At whole dollar equity increments, approximately USD 15 million of equity is required to preserve minimum downside liquidity. At the four million dollar increments tested above, the first structure with downside headroom is USD 16 million of equity alongside USD 4 million of debt.',
  implication:
    'A decision maker who places meaningful probability on the downside case should increase the equity component or require a committed liquidity backstop. This tension is not a defect in the recommendation. It is the boundary of it, and it is stated rather than hidden.',
} as const;
