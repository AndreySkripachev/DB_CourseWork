import { FC, Fragment, memo, useState } from 'react';

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
            {list.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={i}>
                <li key={item}>{item}</li>
                {i !== list.length - 1 && <div className={style.separator} />}
              </Fragment>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export const DropdownMenu = memo(DropdownListComponent);
