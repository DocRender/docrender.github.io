import { BusinessSchema } from "@huajianmao/xrender/dist/core/types";

export declare type Business = {
  id: string;
  title: string;
  desc: string;
  schema?: BusinessSchema;
};

export declare type BusinessGroup = {
  id: string;
  title: string;
  businesses: Business[];
};
