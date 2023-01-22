import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

import { TableDataModel } from '@models/table-data.model';

@Component({
  selector: 'app-table-dialog',
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './table-dialog.html',
})
export class TableDialog implements OnInit {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    latitude: new FormControl(0, Validators.required),
    longitude: new FormControl(0, Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<TableDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TableDataModel,
  ) {}

  ngOnInit() {
    if (this.data) {
      this.form.patchValue({
        name: this.data.name,
        latitude: this.data.latitude,
        longitude: this.data.longitude
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const item = {
      ...this.form.value,
      id: this.data.id || uuidv4()
    }

    this.dialogRef.close(item);
  }
}
