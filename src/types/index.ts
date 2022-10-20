export interface ILevel {
  id: string,
  label: string
}

export interface IHeaderProps {
  isStartGame: boolean,
  isStopTimer: boolean,
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
  onContextMenu: (event: any, x: number, y: number) => void,
}

export interface IModalWindowProps {
  open: boolean,
  title: string,
  onClickBtn: (isRestart: boolean) => void,
}

export interface ITimerProps {
  isStartGame: boolean,
  isStopTimer: boolean,
}

export interface IInitialOpenModal {
  open: boolean,
  text: string,
}

export interface IGame {
  start: boolean,
  stopTimer: boolean,
}
