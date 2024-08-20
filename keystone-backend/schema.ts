import type { Lists } from '.keystone/types'
import {MagentoAttribute} from "./schemas/MagentoAttribute";
import {CatalogSourceAttribute} from "./schemas/CatalogSourceAttribute";
import {User} from "./schemas/User";
import {Role} from "./schemas/Role";

// WARNING: this example is for demonstration purposes only
//   as with each of our examples, it has not been vetted
//   or tested for any particular usage

export type Session = {
  itemId: string
  data: {
    isAdmin: boolean
  }
}

export const lists = {
  User,
  Role,
  CatalogSourceAttribute,
  MagentoAttribute
} satisfies Lists
