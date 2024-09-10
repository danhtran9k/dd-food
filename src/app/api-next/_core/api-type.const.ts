export const Role = {
  Owner: 'Owner',
  Employee: 'Employee',
  Guest: 'Guest'
} as const

export const RoleValues = [Role.Owner, Role.Employee] as const

export type RoleType = (typeof Role)[keyof typeof Role]
