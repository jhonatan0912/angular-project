import { Pipe, PipeTransform } from '@angular/core';
import { IWarehouse } from '../../core/models/warehouse.interface';

@Pipe({
  name: 'filtro',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(items: IWarehouse[], filter: string): any[] {
    if (!filter) {
      return items;
    }

    const filterText = filter.toLowerCase();
    return items.filter((item) => item.description?.toLowerCase().includes(filterText));
  }
}
