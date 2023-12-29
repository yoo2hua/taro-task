type mapDropdownMenuOptionParams = {
  value: number
  label: string
}[]

export const mapDropdownMenuOption = (options: mapDropdownMenuOptionParams) => {
  return options.map((i) => {
    return {
      text: i.label,
      value: i.value,
    }
  })
}
