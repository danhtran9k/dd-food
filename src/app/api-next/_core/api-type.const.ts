export const Role = {
  Owner: 'Owner',
  Employee: 'Employee',
  Guest: 'Guest'
} as const

// export const RoleValues = [Role.Owner, Role.Employee, Role.Guest] as const
export const RoleValues = Object.values(Role)

export type RoleType = (typeof Role)[keyof typeof Role]
