export interface ILevel {
  id: string,
  label: string
}

export interface IHeaderProps {
  level: string,
  onChangeLevel: (value: string) => void,
}

export interface ISelectProps {
  selected: string,
  label: string
  levels: ILevel[],
  onChange: (value: string) => void,
}

export interface IMapProps {
  value: Array<string[]>,
}
