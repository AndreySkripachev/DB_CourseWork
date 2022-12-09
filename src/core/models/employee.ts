export interface Employee {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly patronymic?: string;
  readonly position: string;
}
