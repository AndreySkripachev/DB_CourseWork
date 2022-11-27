export class Product {
  public readonly id: number;

  public readonly name: string;

  public readonly cost: number;

  public readonly type: string;

  public readonly description: string;

  public constructor(data: Product) {
    this.id = data.id;
    this.name = data.name;
    this.cost = data.cost;
    this.type = data.type;
    this.description = data.description;
  }
}
