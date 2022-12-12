import { FC } from 'react';

interface Props {
  readonly value: string;
}

const mask = '#(###)### ##-##';

const format = (value: string): string => {
  if (value.length !== 11) return 'Invalid phone number';
  const phoneNumber = mask.split('');

  // eslint-disable-next-line no-restricted-syntax
  for (const digit of value) {
    const index = phoneNumber.indexOf('#');

    phoneNumber[index] = digit;
  }

  return phoneNumber.join('');
};

export const PhoneNumber: FC<Props> = ({ value }) => (
  <span>{format(value)}</span>
);
