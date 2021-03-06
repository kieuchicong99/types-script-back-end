import { DataTypeAbstract, DefineAttributeColumnOptions } from "sequelize/index";

type SequelizeAttribute = string | DataTypeAbstract | DefineAttributeColumnOptions;

declare global {
  type SequelizeAttributes<T extends { [key: string]: any }> = {
    [P in keyof T]: SequelizeAttribute
  };
}