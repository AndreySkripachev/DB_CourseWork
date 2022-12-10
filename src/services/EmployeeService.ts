import { EmployeeDto } from '../core/dtos';
import { employeeMapper } from '../core/mappers';
import { Employee } from '../core/models';
import { ApiService } from './ApiService';

import http from './HttpService';

const URL = 'employees';

export default class EmployeeService implements ApiService {
  /**
   * Fetches Employees from API.
   */
  public static async get(): Promise<Employee[]> {
    const response = await http.get<EmployeeDto[]>(URL);
    const EmployeesDto = response.data;

    return EmployeesDto.map(employeeMapper.fromDto);
  }

  public static async post({
    firstName,
    lastName,
    position,
    patronymic,
  }: Omit<Employee, 'id'>): Promise<void> {
    await http.get(`${URL}/${firstName}/${lastName}/${patronymic}/${position}`);
  }

  public static async delete(id: number): Promise<void> {
    await http.get(`${URL}/delete/${id}`);
  }
}
