/**
 * @description List of demo data for the portfolio site.
 *
 * @exports DEMO_DATA as an array of demo objects.
 *
 */

export type DemoItem = {
  id: string;
  name: string;
  description: string;
  links: DemoLinks;
  group: "Demo";
  parent: string;
  page: string;
};

export type DemoLinks = {
  repo: string;
  live?: string;
};
 
export const DEMO_DATA: DemoItem[] = [
  {
    id: "InterestCalc",
    name: "Custom Amoritiazation Calculator",
    description: "Demonstration of an application I wrote that calculates an amortization schedule based on how much principal you can pay per month consistently.",
    links: { repo: "https://github.com/BRudow317/" },
    group: "Demo",
    parent: "demo",
    page: "/interestcalc",
  },
];