export abstract class ApiService {
  public abstract readonly get?: <T>() => T;

  public abstract readonly delete?: <T>(id: number) => T;

  public abstract readonly post?: <T>(...data: any) => T;
}
