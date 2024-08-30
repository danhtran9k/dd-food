type TSelectMulti = (selected: File[]) => void
type TSelectSingle = (selected: File) => void

type TBTnExtends = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  accept: string

  className?: string
  children?: React.ReactNode
  btnCustom?: React.ReactNode
  isMultiple?: boolean
}

export type TBtnProps =
  | (TBTnExtends & {
      isMultiple: true
      onFileSelected: TSelectMulti
    })
  | (TBTnExtends & {
      isMultiple?: false
      onFileSelected: TSelectSingle
    })
