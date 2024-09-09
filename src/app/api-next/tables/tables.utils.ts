import envConfig from "@core/config"

export const getTableLink = ({
  token,
  tableNumber
}: {
  token: string
  tableNumber: number
}) => {
  return (
    envConfig.NEXT_PUBLIC_URL + '/tables/' + tableNumber + '?token=' + token
  )
}