import {getContext} from '@keystone-6/core/context'
import {roles} from './seed-data/roles'
import * as PrismaModule from '.myprisma/client'
import config from './keystone'

type UserProps = {
  name: string,
  email: string,
  role: string
}

type RoleProps = {
  name: string,
  permissionFields: string
}

export async function main () {
  const context = getContext(config, PrismaModule)

  console.log(`🌱 Inserting seed data`)

  const createRoles = async (roleData: RoleProps) => {
    console.log('role data', roleData)

    await context.query.Roles.createOne({
      data: roleData,
      query: 'id',
    })
  }

  for (const role of roles) {
    console.log(`👩 Adding user: ${role.name}`)
    const roleObject = {
      name: role.name,
      permissionFields: role.permissionFields
    }
    await createRoles(roleObject)
  }

  console.log(`✅ Seed data inserted`)
  console.log(`👋 Please start the process with \`yarn dev\` or \`npm run dev\``)
}

main()
