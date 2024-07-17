import type { Lists } from '.keystone/types'
import {MagentoAttribute} from "./schemas/MagentoAttribute";
import {PimAttribute} from "./schemas/PimAttribute";
import {User} from "./schemas/User";

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
  PimAttribute,
  MagentoAttribute
} satisfies Lists
