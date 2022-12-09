import { EmployeeDto } from '../dtos/employee.dto';
import { Employee } from '../models/employee';
import { MapperFromDto } from './mapper';

class EmployeeMapper implements MapperFromDto<EmployeeDto, Employee> {
  /** @inheritdoc */
  public fromDto(dto: EmployeeDto): Employee {
    return {
      ...dto,
    };
  }
}

export const employeeMapper = new EmployeeMapper();
