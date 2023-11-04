import { BusinessGroup } from "../types";

import DemoInfo from "../schemas/demo/info.json";
import DemoLandscape from "../schemas/demo/landscape.json";
import DemoTable from "../schemas/demo/table.json";
import MedOutpatient from "../schemas/med/outpatient.json";
// import MedCheckup from "../schemas/med/checkup.json";
import { BusinessSchema } from "@huajianmao/xrender/dist/core/types";

const GROUPS: BusinessGroup[] = [
  {
    id: "demo",
    title: "Demo",
    businesses: [
      { id: "info", title: "Personal Info", desc: "Demo personal information table", schema: DemoInfo as BusinessSchema },
      { id: "landscape", title: "Landscape layout", desc: "Demo of Landscape layout", schema: DemoLandscape as BusinessSchema },
      { id: "table", title: "Table View", desc: "Demo of Table", schema: DemoTable as BusinessSchema },
    ],
  },
  {
    id: "med",
    title: "Medical Informatics Forms",
    businesses: [
      { id: "outpatient", title: "Outpatient", desc: "Outpatient form", schema: MedOutpatient as BusinessSchema },
      // { id: "checkup", title: "Checkup", desc: "Checkup form", schema: MedCheckup as BusinessSchema },
    ],
  },
];

export default GROUPS;
