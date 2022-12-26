import http from './HttpService';

interface NewSaleItem {
  readonly product: number;
  readonly sale: number;
  readonly count: number;
}

const URL = 'sales';

export default class SaleItemService {
  public static async post({
    count,
    product,
    sale,
  }: NewSaleItem): Promise<void> {
    await http.get(`${URL}/add_item/${product}/${count}/${sale}`);
  }

  public static async delete(id: number): Promise<void> {
    await http.get(`${URL}/remove_item/${id}`);
  }
}
