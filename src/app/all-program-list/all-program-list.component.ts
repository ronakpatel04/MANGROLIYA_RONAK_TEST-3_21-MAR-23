import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProgramComponent } from '../edit-program/edit-program.component';
import { ProgramService } from '../service/program.service';
import { Program } from '../shared/apiResponse.interface';

@Component({
  selector: 'app-all-program-list',
  templateUrl: './all-program-list.component.html',
  styleUrls: ['./all-program-list.component.css'],
})
export class AllProgramListComponent implements OnInit {
  data: Program[] = [];

  constructor(
    private programService: ProgramService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProgram();
  }
  getProgram() {
    this.programService.getAllProgram().subscribe((res) => {
      this.data = res.programs;
    });
    this.programService.program.subscribe((res) => {
      this.data = res;
    });
  }
  onStatusChange(data: Program) {
    if (data.isActive) {
      this.programService
        .deactiveProgram(data.programID)
        .subscribe((res) => {});
    } else {
      this.programService.activeProgram(data.programID).subscribe((res) => {});
    }
  }

  addProgram() {
    this.dialog.open(EditProgramComponent);
  }

  onEdit(data: any) {
    this.dialog.open(EditProgramComponent, {
      data: data,
    });
  }
}
