import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { catchError, tap } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { throwError } from 'rxjs';

import { LocationsService } from '@services/locations.service';
import { TableDataModel } from '@models/table-data.model';
import { TableDialog } from '../table-dialog/table-dialog';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  locations!: MatTableDataSource<TableDataModel>;
  displayedColumns: string[] = ['name', 'latitude', 'longitude', 'options'];

  @ViewChild(MatTable) table!: MatTable<TableDataModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly locationsService: LocationsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.locationsService.getLocations()
      .pipe(
        tap(locations => {
          const tableData: TableDataModel[] = locations.map(l => ({
            name: l.name,
            latitude: l.coordinates[0],
            longitude: l.coordinates[1],
          }))
          this.locations = new MatTableDataSource(tableData);
          this.locations.paginator = this.paginator;
          this.locations.sort = this.sort;
        }),
        catchError(err => {
          console.log('Error loading', err);
          return throwError(err)
        })
      )
      .subscribe();
  }

  editData(item: TableDataModel): void {
    const dialogRef = this.dialog.open(TableDialog, {
      data: {...item},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.table.renderRows();
    });
  }

  addData(): void {
    const dialogRef = this.dialog.open(TableDialog, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(this.locations);
      this.locations.data.push(result)
      this.table.renderRows();
      console.log(this.locations);
    });
  }
}
