import { ValidationError } from "sequelize";

export const parseSequelizeError = (error: ValidationError) => {
  return error.errors.map( item => item.message) ;
}