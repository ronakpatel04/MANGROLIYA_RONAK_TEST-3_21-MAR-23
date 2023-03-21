import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProgramService } from '../service/program.service';
import { Program } from '../shared/apiResponse.interface';

@Component({
  selector: 'app-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.css'],
})
export class EditProgramComponent implements OnInit {
  programForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private programService: ProgramService,
    private dialogRef: MatDialogRef<EditProgramComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.programForm = this.fb.group({
      programName: '',
      programNumber: '',
      programBudget: '',
      programDescription: '',
      isVirtual: ''
    });
  }
  ngOnInit(): void {
    this.programForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.programForm.valid) {
      if (this.data) {
       
          this.programService.updateProgram({programID: this.data.programID, ...this.programForm.value}).subscribe(res=>{
           this.dialogRef.close(true);
          });

      } else {
        this.programService.addProgram(this.programForm.value).subscribe({
          next: (val: Program) => {
            alert('program added sucessfully !');
            this.dialogRef.close(true);
          },
        });
      }
    }
  }
}
