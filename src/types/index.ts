export interface ILevel {
  id: string,
  label: string
}

export interface IHeaderProps {
  isStartGame: boolean,
  onClickStartBtn: () => void,
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
  isStartGame: boolean,
}

export interface IShowMapProps {
  value: Array<string[]>,
  onClickCell: (x: number, y: number) => void,
}

export interface ITimerProps {
  isStartGame: boolean,
}
