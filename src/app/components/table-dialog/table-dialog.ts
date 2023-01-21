import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { TableDataModel } from '@models/table-data.model';

@Component({
  selector: 'app-table-dialog',
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule
  ],
  standalone: true,
  templateUrl: './table-dialog.html',
})
export class TableDialog {
  constructor(
    public dialogRef: MatDialogRef<TableDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TableDataModel,
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }
}
