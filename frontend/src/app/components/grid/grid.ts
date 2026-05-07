import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { HeaderComponent } from '../header/header';

import {
  fetchData,
  fetchRecords
} from '../../services/api.service';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [AgGridAngular, HeaderComponent],
  templateUrl: './grid.html',
  styleUrls: ['./grid.css']
})
export class GridComponent implements OnInit {

  columnDefs: any[] = [];

  rowData: any[] = [];

  originalData: any[] = [];

  bases: any[] = [];

  tables: any[] = [];

  selectedBase = '';

  selectedTable = '';

  defaultColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true
  };

  async ngOnInit() {

    const data = await fetchData();

    console.log("GRID DATA:", data);

    if (data.length > 0) {

      this.columnDefs = Object.keys(data[0]).map(key => ({
        field: key
      }));

      this.rowData = data;

      this.originalData = data;
    }
  }

  async onBaseChange(baseId: string) {

    this.selectedBase = baseId;

    console.log("SELECTED BASE:", this.selectedBase);
  }

  async onTableChange(tableName: string) {

    this.selectedTable = tableName;

    console.log("SELECTED TABLE:", this.selectedTable);

    const data = await fetchRecords(
      this.selectedBase,
      this.selectedTable
    );

    console.log("RECORDS:", data);

    if (data.length > 0) {

      this.columnDefs = Object.keys(data[0]).map(key => ({
        field: key
      }));

      this.rowData = data;

      this.originalData = data;
    }
  }

  onSearch(text: string) {

    this.rowData = this.originalData.filter(row =>
      JSON.stringify(row)
        .toLowerCase()
        .includes(text.toLowerCase())
    );
  }
}