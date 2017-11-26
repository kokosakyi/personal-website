import { Component, OnInit, Directive, ElementRef, Renderer, HostListener } from '@angular/core';
import { BlastLoadService } from '../services/blast-load.service';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-blast-parameters',
  templateUrl: './blast-parameters.component.html',
  styleUrls: ['./blast-parameters.component.css']
})

export class BlastParametersComponent implements OnInit {

  form;
  displayAnswer: boolean;
  scaledDistance: number;
  Pso: number;
  Iso: number;
  Pr: number;
  Ir: number;
  ta: number;
  td: number;
  vsf: number;
  qs: number;
  blastTypes: Array<string>;
  chosenBlastType: string;

  constructor(
    private blastLoad: BlastLoadService,
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private renderer: Renderer
  ) { }

  ngOnInit() {
    this.createBlastForm();
    this.displayAnswer = false;
    this.blastTypes = new Array<string>();
    this.blastTypes.push("Hemispherical");
    this.blastTypes.push("Spherical");
    this.chosenBlastType = '';
  }

  createBlastForm() {
    this.form = this.formBuilder.group({
      // blast type
      blastType: ['', Validators.compose([

      ])],
      // charge mass
      chargeMass: ['', Validators.compose([

      ])],
      // standoff distance
      standOffDistance: ['', Validators.compose([

      ])]
    });
  }

  computeBlastParameters(): void {
    this.scaledDistance = this.blastLoad.getScaledDistance();
    this.Pso = this.blastLoad.getSideOnPressure();
    this.Iso = this.blastLoad.getSideOnImpulse();
    this.Pr = this.blastLoad.getReflectedPressure();
    this.Ir = this.blastLoad.getReflectedImpulse();
    this.ta = this.blastLoad.getTimeOfArrival();
    this.td = this.blastLoad.getPositivePhaseDuration();
    this.vsf = this.blastLoad.getSchockFrontVelocity();
    this.qs = this.blastLoad.getPeakDynamicPressure();
    this.displayAnswer = true;
    // Round of results to 2 d.p.
    this.formatResults();
  }

  onSubmit() {
    this.blastLoad.setChargeMass(parseFloat(this.form.value['chargeMass']));
    this.blastLoad.setStandOffDistance(parseFloat(this.form.controls['standOffDistance'].value));
    this.chosenBlastType = this.form.value['blastType'];

    if (this.chosenBlastType == "Hemispherical") {
      this.blastLoad.setBlastType("Hemispherical");
    }
    else {
      this.blastLoad.setBlastType("Spherical");
    }
    this.computeBlastParameters();
  }

  formatResults(): void {
    this.scaledDistance = (Math.round(this.scaledDistance * 100)) / 100;
    this.Pso = (Math.round(this.Pso * 100)) / 100;
    this.Iso = (Math.round(this.Iso * 100)) / 100;
    this.Pr = (Math.round(this.Pr * 100)) / 100;
    this.Ir = (Math.round(this.Ir * 100)) / 100;
    this.ta = (Math.round(this.ta * 100)) / 100;
    this.td = (Math.round(this.td * 100)) / 100;
    this.vsf = (Math.round(this.vsf * 100)) / 100;
    this.qs = (Math.round(this.qs * 100)) / 100;
  }

  @HostListener('keydown') onKeyDown() {
    //let part = this.el.nativeElement.querySelector('#chargeMass');
    this.displayAnswer = false;
  }

  @HostListener('onchange') onChange() {
    this.displayAnswer = false;
    console.log('Hi');
  }

  hideResults() {
    this.displayAnswer = false;
    console.log('button clicked');
  }

}
