import { EmployeeDto } from '../core/dtos';
import { employeeMapper } from '../core/mappers';
import { Employee } from '../core/models';
import { ApiService } from './ApiService';

import http from './HttpService';

export default class EmployeeService implements ApiService {
  /**
   * Fetches Employees from API.
   */
  public static async get(): Promise<Employee[]> {
    const response = await http.get<EmployeeDto[]>('employee');
    const EmployeesDto = response.data;

    return EmployeesDto.map(employeeMapper.fromDto);
  }
}
