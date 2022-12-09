import { FC, memo, useState } from 'react';

import style from './style.module.css';

interface Props {
  readonly list: readonly string[];

  readonly title: string;
}

const DropdownListComponent: FC<Props> = ({ list, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div>
        <button className={style.toggle} onClick={toggleIsOpen} type="button">
          {isOpen ? '▼' : '►'}
        </button>
        {title}
      </div>
      {isOpen && (
        <div className={style.modalAnchor}>
          <ul className={style.modal}>
            {list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export const DropdownMenu = memo(DropdownListComponent);
