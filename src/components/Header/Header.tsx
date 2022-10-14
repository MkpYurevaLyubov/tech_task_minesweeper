import React from 'react';
import Select from "../Select/Select";
import { ILevel } from "../../types";

interface IHeaderProps {
  level: ILevel,
  onChangeLevel: (e: any) => void,
}

const levelsList = [
  {
    id: 1,
    label: 'Простой',
  },
  {
    id: 2,
    label: 'Средний',
  },
  {
    id: 3,
    label: 'Сложный',
  }
]

const Header: React.FC<IHeaderProps> = ({ level, onChangeLevel }) => {
  return (
    <>
      <Select selected={level} levels={levelsList} onChange={onChangeLevel} />
    </>
  );
};

export default Header;
