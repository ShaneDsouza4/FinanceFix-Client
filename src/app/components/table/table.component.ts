import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableDataConfig } from 'src/app/interfaces/ui-config/table-data-config.interface';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() data: TableDataConfig[] = [];
  @Output() removeRow: EventEmitter<TableDataConfig> = new EventEmitter();

  constructor(public uiService: UiService) { }
  handleAction(item: TableDataConfig) {
    this.removeRow.emit(item);

  }
}
