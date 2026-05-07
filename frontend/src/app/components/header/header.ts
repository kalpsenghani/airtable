import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { fetchBases, fetchTables } from '../../services/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {

  @Output() searchChange = new EventEmitter<string>();

  @Output() baseChange = new EventEmitter<string>();

  @Output() tableChange = new EventEmitter<string>();

  searchText = '';

  bases: any[] = [];

  tables: any[] = [];

  selectedBase = '';

  selectedTable = '';

  async ngOnInit() {

    this.bases = await fetchBases();

    console.log("BASES:", this.bases);
  }

  async onBaseChange() {

    this.baseChange.emit(this.selectedBase);

    this.tables = await fetchTables(this.selectedBase);

    console.log("TABLES:", this.tables);
  }

  onTableChange() {

    this.tableChange.emit(this.selectedTable);
  }

  onSearch() {

    this.searchChange.emit(this.searchText);
  }
}