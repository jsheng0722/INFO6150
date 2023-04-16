import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.css']
})
export class TypeFormComponent {
  typeForm: FormGroup;
  options: string[] = ['Animation', 'Brand/Graphic Design', 'UI/Visual Design', 'Product Design', 'Illustration', 'UX Design/Research', 'Leadership', 'Development', 'Web Design', 'Mobile Design', 'Writing', 'Marketing'];
  maxTypes = 3;
  selectedTypes!: string[];
  @Output() typesSelected = new EventEmitter<string[]>();
  
  constructor(private formBuilder: FormBuilder) {
    this.typeForm = this.formBuilder.group({});
    this.options.forEach((option) => {
      this.typeForm.addControl(option, this.formBuilder.control(''));
    });
  }

  onSelect(option: string) {
    const selectedOptions = Object.keys(this.typeForm.value).filter((key) => this.typeForm.value[key]);
    if (selectedOptions.length > this.maxTypes) {
      this.typeForm.controls[option].setValue(false);
    } else {
      this.options.forEach((opt) => {
        if (!selectedOptions.includes(opt)) {
          this.typeForm.controls[opt].enable();
        }
      });
    }

    if (selectedOptions.length === this.maxTypes) {
      this.options.forEach((opt) => {
        if (!selectedOptions.includes(opt)) {
          this.typeForm.controls[opt].disable();
        }
      });
    }

    this.selectedTypes = selectedOptions;
    this.typesSelected.emit(selectedOptions);
  }
}
