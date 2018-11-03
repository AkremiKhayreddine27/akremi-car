import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "ngx-car-cost-form",
  templateUrl: "./car-cost-form.component.html",
  styleUrls: ["./car-cost-form.component.scss"]
})
export class CarCostFormComponent implements OnInit {
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      workforce: new FormControl(null, [
        Validators.required,
        Validators.min(0)
      ]),
      products: new FormControl(10, [Validators.required, Validators.min(0)]),
      discount: new FormControl(5, [Validators.required, Validators.min(0)]),
      tva: new FormControl(5, [Validators.required, Validators.min(0)]),
      total: new FormControl(null)
    });
  }

  get workforce(): FormControl {
    return this.form.get("workforce") as FormControl;
  }

  get products(): FormControl {
    return this.form.get("products") as FormControl;
  }

  get discount(): FormControl {
    return this.form.get("discount") as FormControl;
  }

  get tva(): FormControl {
    return this.form.get("tva") as FormControl;
  }

  get total(): FormControl {
    return this.form.get("total") as FormControl;
  }
}
