import { Injectable } from '@angular/core';

@Injectable()
export class BlastLoadService {
  private blastType: string;
  private R: number;
  private W: number;
  private z: number;
  private log10_z: number;
  private incidentAngle: number = 0;
  private reflectCoeff: number;
  private Pso: number;
  private Pso_neg: number;
  private Iso: number;
  private Iso_neg: number;
  private Ir: number;
  private Ir_neg: number;
  private Pr: number;
  private Pr_neg: number;
  private ta: number;
  private td_pos: number;
  private td_neg: number;
  private vsf: number;
  private bso: number;
  private br: number;
  private tooClose: boolean;
  private tooFar: boolean;
  private Po: number = 101.325;
  private IrDet: number = 0;
  private b: number = 0.1;

  constructor() {

  }

  public setStandOffDistance(standOffDistance: number): void {
    this.R = standOffDistance;
  }

  public getStandOffDistance(): number {
    return this.R;
  }

  public setChargeMass(chargeMass: number): void {
    this.W = chargeMass;
  }

  public getChargeMass(): number {
    return this.W;
  }


  public getScaledDistance(): number {
    this.z = (this.R / Math.pow(this.W, 1 / 3))
    return this.z;
  }

  private computelog10_z(): void {
    this.log10_z = Math.log10(this.z);
  }

  public setBlastType(blstType: string): void {
    this.blastType = blstType;
  }

  public getBlastType(): string {
    return this.blastType;
  }

  public getSideOnPressure(): number {
    this.computelog10_z();
    if (this.blastType == "Hemispherical") {
      this.Pso = this.hemispherical_Pso(this.log10_z);
    }
    else {
      this.Pso = this.spherical_Pso(this.log10_z);
    }
    return this.Pso;
  }

  public getNegativeSideOnPressure(): number {
    return this.Pso_neg;
  }

  public getSideOnImpulse(): number {
    this.computelog10_z();
    if (this.blastType == "Hemispherical") {
      this.Iso = this.hemispherical_Iso(this.log10_z, Math.pow(this.W, (1 / 3)));
    }
    else {
      this.Iso = this.spherical_Iso(this.log10_z, Math.pow(this.W, (1 / 3)));
    }
    return this.Iso;
  }

  public getNegativeSideOnImpulse(): number {
    return this.Iso_neg;
  }

  public getReflectedPressure(): number {
    // 3 possible scenarios
    // (1) angle of incidence = 0 (2) angle of incidence = 90 (3) angle of incidence = certain value
    this.computelog10_z();
    if (this.incidentAngle == 0) {
      if (this.blastType == "Hemispherical") {
        this.Pr = this.hemispherical_Pr(this.log10_z);
      }
      else {
        this.Pr = this.spherical_Pr(this.log10_z);
      }
    }
    else if (this.incidentAngle == 90) {
      if (this.blastType == "Hemispherical") {
        this.Pr = this.hemispherical_Pso(this.log10_z);
      }
      else {
        this.Pr = this.spherical_Pso(this.log10_z);
      }
    }
    else {

    }
    return this.Pr;
  }

  public getReflectedImpulse(): number {
    // 3 possible scenarios
    // (1) angle of incidence = 0 (2) angle of incidence = 90 (3) angle of incidence = certain value
    this.computelog10_z();
    if (this.incidentAngle == 0) {
      if (this.blastType == "Hemispherical") {
        this.Ir = this.hemispherical_Ir(this.log10_z, Math.pow(this.W, (1 / 3)));
      }
      else {
        this.Ir = this.spherical_Ir(this.log10_z, Math.pow(this.W, (1 / 3)));
      }
    }
    else if (this.incidentAngle == 90) {
      if (this.blastType == "Hemispherical") {
        this.Ir = this.hemispherical_Iso(this.log10_z, Math.pow(this.W, (1 / 3)));
      }
      else {
        this.Ir = this.spherical_Iso(this.log10_z, Math.pow(this.W, (1 / 3)));
      }
    }
    else {

    }
    return this.Ir;
  }

  public getNegativeReflectedImpulse() {
    return this.Ir_neg;
  }

  public getTimeOfArrival(): number {
    this.computelog10_z();
    if (this.blastType == "Hemispherical") {
      this.ta = this.hemispherical_Ta(this.log10_z, Math.pow(this.W, (1 / 3)));
    }
    else {
      this.ta = this.spherical_Ta(this.log10_z, Math.pow(this.W, (1 / 3)));
    }
    return this.ta;
  }


  public getPositivePhaseDuration(): number {
    this.computelog10_z();
    if (this.blastType == "Hemispherical") {
      this.td_pos = this.hemispherical_Td(this.log10_z, Math.pow(this.W, (1 / 3)));
    }
    else {
      this.td_pos = this.spherical_Td(this.log10_z, Math.pow(this.W, (1 / 3)));
    }
    return this.td_pos;
  }

  public getNegativePhaseDuration(): number {
    return this.td_neg;
  }

  public getSchockFrontVelocity(): number {
    this.computelog10_z();
    if (this.blastType == "Hemispherical") {
      this.vsf = this.hemispherical_Vs(this.log10_z);
    }
    else {
      this.vsf = this.spherical_Vs(this.log10_z);
    }
    return this.vsf;
  }

  public getMinimumStandOffDistance(): number {
    let r: number = Math.pow(this.W, (1 / 3)) * 0.66228687;
    return r;
  }

  public getMaximumStandOffDistance(): number {
    let r: number = Math.pow(this.W, (1 / 3)) * 39.6589681;
    return r;
  }

  public getIncidentDecayCoefficient(): number {
    return (this.bso = this.decay_coeff(this.Iso, this.Pso, this.td_pos));
  }

  public getReflectedDecayCoefficient(): number {
    return (this.br = this.decay_coeff(this.Ir, this.Pr, this.td_pos));
  }

  public getPeakDynamicPressure(): number {
    return this.peak_dynamic_pressure();
  }

  public get_b(): number {
    return this.det_b();
  }

  // Computations
  //**********************************************
  //**********************************************
  /**
  * Calculates the hemispherical incident (side-on) pressure (kPa).
  * @param t Common logarithm of scaled distance (t=logz)
  * where z = scaled distance = R/W^(1/3)
  * @return Side-on pressure
  */
  private hemispherical_Pso(t: number): number {
    let x_exp: number;
    let x_fnc: number;

    x_fnc = 1.35034249993 * t - 0.214362789151;

    x_exp = (2.78076916577 - 1.6958988741 * x_fnc - 0.154159376846 * Math.pow(x_fnc, 2)
      + 0.514060730593 * Math.pow(x_fnc, 3) + 0.0988534365274 * Math.pow(x_fnc, 4)
      - 0.293912623038 * Math.pow(x_fnc, 5) - 0.0268112345019 * Math.pow(x_fnc, 6)
      + 0.109097496421 * Math.pow(x_fnc, 7) + 0.00162846756311 * Math.pow(x_fnc, 8)
      - 0.0214631030242 * Math.pow(x_fnc, 9) + 0.0001456723382 * Math.pow(x_fnc, 10)
      + 0.00167847752266 * Math.pow(x_fnc, 11)) * Math.log(10);

    return Math.exp(x_exp);
  }

  /**
  * Calculates the sideon (incident) pressure (kPa)of the spherical air burst.
  *
  * @param t Common logarithm of scaled distance
  * @return reflected pressure
  */
  private spherical_Pso(t: number): number {
    let x_exp: number;
    let x_fnc: number;

    x_fnc = 1.35034249993 * t - 0.214362789151;

    x_exp = (2.611368669 - 1.69012801396 * x_fnc + 0.00804973591951 * Math.pow(x_fnc, 2)
      + 0.336743114941 * Math.pow(x_fnc, 3) - 0.00516226351334 * Math.pow(x_fnc, 4)
      - 0.0809228619888 * Math.pow(x_fnc, 5) - 0.00478507266747 * Math.pow(x_fnc, 6)
      + 0.00793030472242 * Math.pow(x_fnc, 7) + 0.0007684469735 * Math.pow(x_fnc, 8)
    ) * Math.log(10);
    return Math.exp(x_exp);
  }

  /**
  * Calculates the spherical incident Impulse (kPa-ms).
  * Note: Only works for an angle of incidence of 90 degrees
  *
  * @param t Common logarithm of scaled distance
  * @param W Cube-root of the charge mass
  * @return incident impulse
  */
  private spherical_Iso(t: number, W: number): number {
    let x_exp: number;
    let x_fnc: number;

    if (t < -0.101274818) {
      x_fnc = 2.34723921354 + 3.24299066475 * t;
      x_exp = (2.38830516757 - 0.443749377691 * x_fnc + 0.168825414684 * Math.pow(x_fnc, 2) + 0.0348138030308 * Math.pow(x_fnc, 3)
        - 0.010435192824 * Math.pow(x_fnc, 4)) * Math.log(10);
    }
    else {
      x_fnc = -1.75305660315 + 2.30629231803 * t;

      x_exp = (1.55197227115 - 0.40463292088 * x_fnc - 0.0142721946082 * Math.pow(x_fnc, 2) + 0.00912366316617 * Math.pow(x_fnc, 3)
        - 0.0006750681404 * Math.pow(x_fnc, 4) - 0.00800863718901 * Math.pow(x_fnc, 5) + 0.00314819515931 * Math.pow(x_fnc, 6)
        + 0.00152044783382 * Math.pow(x_fnc, 7) - 0.0007470265899 * Math.pow(x_fnc, 8)) * Math.log(10);
    }

    return (W * Math.exp(x_exp));
  }

  /**
  * Calculates the Side-on Impulse (kPa-ms).
  * Note: Only works for an angle of incidence of 90 degrees
  *
  * @param t Common logarithm of scaled distance
  * @param W Cube-root of the charge weight
  * @return Side-on impulse
  */
  private hemispherical_Iso(t: number, W: number): number {
    let x_exp: number;
    let x_fnc: number;
    if (t < -0.019996628) {
      x_fnc = 3.0760329666 * t + 2.06761908721;

      x_exp = (2.52455620925 - 0.502992763686 * x_fnc + 0.171335645235 * Math.pow(x_fnc, 2)
        + 0.045017696305 * Math.pow(x_fnc, 3) - 0.0118964626402 * Math.pow(x_fnc, 4))
        * Math.log(10);
    }
    else {
      x_fnc = 2.40697745406 * t - 1.94708846747;

      x_exp = (1.67281645863 - 0.384519026965 * x_fnc - 0.0260816706301 * Math.pow(x_fnc, 2)
        + 0.00595798753822 * Math.pow(x_fnc, 3) + 0.014544526107 * Math.pow(x_fnc, 4)
        - 0.00663289334734 * Math.pow(x_fnc, 5) - 0.00284189327204 * Math.pow(x_fnc, 6)
        + 0.0013644816227 * Math.pow(x_fnc, 7)) * Math.log(10);
    }

    return (W * Math.exp(x_exp));
  }


  /**
  * Calculates the Time of Arrival (ms).
  *
  * @param t Common logarithm of scaled distance
  * @param W Cube-root of the charge weight
  * @return Time of arrival
  */
  private hemispherical_Ta(t: number, W: number): number {
    let x_exp: number;
    let x_fnc: number;

    x_fnc = 1.37784223635 * t - 0.202425716178;

    x_exp = (-0.0591634288046 + 1.35706496258 * x_fnc + 0.052492798645 * Math.pow(x_fnc, 2)
      - 0.196563954086 * Math.pow(x_fnc, 3) - 0.0601770052288 * Math.pow(x_fnc, 4)
      + 0.0696360270891 * Math.pow(x_fnc, 5) + 0.0215297490092 * Math.pow(x_fnc, 6)
      - 0.0161658930785 * Math.pow(x_fnc, 7) - 0.00232531970294 * Math.pow(x_fnc, 8)
      + 0.00147752067524 * Math.pow(x_fnc, 9)) * Math.log(10);
    return (W * Math.exp(x_exp));
  }

  /**
  * Calculates the spherical Time of Arrival (ms).
  *
  * @param t Common Logarithm of scaled distance
  * @param W Cube-root of the charge weight
  * @return Time of arrival
  */
  private spherical_Ta(t: number, W: number): number {
    let x_exp: number;
    let x_fnc: number;

    x_fnc = -0.253273111999 + 1.37407043777 * t;

    x_exp = (0.0720707787637 + 1.36456871214 * x_fnc - 0.0570035692784 * Math.pow(x_fnc, 2) - 0.182832224796 * Math.pow(x_fnc, 3)
      + 0.0118851436014 * Math.pow(x_fnc, 4) + 0.0432648687627 * Math.pow(x_fnc, 5) - 0.0007997367834 * Math.pow(x_fnc, 6)
      - 0.00436073555033 * Math.pow(x_fnc, 7)) * Math.log(10);

    return (W * Math.exp(x_exp));
  }

  /**
  * Calculates the Positive Phase Duration (ms).
  *
  * @param t Common logarithm of scaled distance
  * @param W Cube-root of the charge weight
  * @return Positive phase duration
  */
  private hemispherical_Td(t: number, W: number): number {
    let x_exp: number;
    let x_fnc: number;

    if (t < 0.004321374) {
      x_fnc = 5.25099193925 * t + 1.92946154068;

      x_exp = (-0.614227603559 + 0.130143717675 * x_fnc + 0.134872511954 * Math.pow(x_fnc, 2)
        + 0.0391574276906 * Math.pow(x_fnc, 3) - 0.00475933664702 * Math.pow(x_fnc, 4)
        - 0.00428144598008 * Math.pow(x_fnc, 5)) * Math.log(10);
    }
    else if (t < 0.444044796) {
      x_fnc = 9.2996288611 * t - 2.12492525216;

      x_exp = (0.315409245784 - 0.0297944268976 * x_fnc + 0.030632954288 * Math.pow(x_fnc, 2)
        + 0.0183405574086 * Math.pow(x_fnc, 3) - 0.0173964666211 * Math.pow(x_fnc, 4)
        - 0.00106321963633 * Math.pow(x_fnc, 5) + 0.00562060030977 * Math.pow(x_fnc, 6)
        + 0.0001618217499 * Math.pow(x_fnc, 7) - 0.0006860188944 * Math.pow(x_fnc, 8))
        * Math.log(10);
    }
    else {
      x_fnc = 3.46349745571 * t - 3.53626218091;

      x_exp = (0.686906642409 + 0.0933035304009 * x_fnc - 0.0005849420883 * Math.pow(x_fnc, 2)
        - 0.00226884995013 * Math.pow(x_fnc, 3) - 0.00295908591505 * Math.pow(x_fnc, 4)
        + 0.00148029868929 * Math.pow(x_fnc, 5)) * Math.log(10);
    }

    return (W * Math.exp(x_exp));
  }


  /**
  * Calculates the Positive Phase Duration (ms).
  *
  * @param t Common Logarithm of scaled distance
  * @param W Cube-root of the charge weight
  * @return Positive phase duration
  */
  private spherical_Td(t: number, W: number): number {
    let x_exp: number;
    let x_fnc: number;

    if (t < -0.051587034) {
      x_fnc = 2.26367268496 + 5.11588554305 * t;

      x_exp = (-0.686608550419 + 0.164953518069 * x_fnc + 0.127788499497 * Math.pow(x_fnc, 2) + 0.00291430135946 * Math.pow(x_fnc, 3)
        + 0.00187957449227 * Math.pow(x_fnc, 4) + 0.0173413962543 * Math.pow(x_fnc, 5) + 0.00269739758043 * Math.pow(x_fnc, 6)
        - 0.00361976502798 * Math.pow(x_fnc, 7) - 0.00100926577934 * Math.pow(x_fnc, 8)) * Math.log(10);
    }
    else if (t > -0.051587034 && t < 0.357934847) {
      x_fnc = -1.33361206714 + 9.2996288611 * t;

      x_exp = (-0.23031841078 - 0.0297944268969 * x_fnc + 0.0306329542941 * Math.pow(x_fnc, 2) + 0.0183405574074 * Math.pow(x_fnc, 3)
        - 0.0173964666286 * Math.pow(x_fnc, 4) - 0.00106321963576 * Math.pow(x_fnc, 5) + 0.0056206003128 * Math.pow(x_fnc, 6)
        + 0.0001618217499 * Math.pow(x_fnc, 7) - 0.0006860188944 * Math.pow(x_fnc, 8)) * Math.log(10);
    }
    else {
      x_fnc = -3.13005805346 + 3.1524725364 * t;

      x_exp = (0.621036276475 + 0.0967031995552 * x_fnc - 0.00801302059667 * Math.pow(x_fnc, 2) + 0.00482705779732 * Math.pow(x_fnc, 3)
        + 0.00187587272287 * Math.pow(x_fnc, 4) - 0.00246738509321 * Math.pow(x_fnc, 5) - 0.000841116668 * Math.pow(x_fnc, 6)
        + 0.0006193291052 * Math.pow(x_fnc, 7)) * Math.log(10);
    }

    return (W * Math.exp(x_exp));
  }

  /**
  * Calculates the normally reflected pressure (kPa) from a hemispherical burst.
  * Note: Only works for an angle of incidence of 0 degrees
  *
  * @param t Common logarithm of scaled distance
  * @return Reflected pressure
  */
  private hemispherical_Pr(t: number): number {
    let x_exp: number;
    let x_fnc: number;

    x_fnc = 1.36637719229 * t - 0.240657322658;

    x_exp = (3.40283217581 - 2.2103087059 * x_fnc - 0.218536586295 * Math.pow(x_fnc, 2)
      + 0.895319589372 * Math.pow(x_fnc, 3) + 0.24989009775 * Math.pow(x_fnc, 4)
      - 0.569249436807 * Math.pow(x_fnc, 5) - 0.11791682383 * Math.pow(x_fnc, 6)
      + 0.224131161411 * Math.pow(x_fnc, 7) + 0.0245620259375 * Math.pow(x_fnc, 8)
      - 0.0455116002694 * Math.pow(x_fnc, 9) - 0.0019093073888 * Math.pow(x_fnc, 10)
      + 0.00361471193389 * Math.pow(x_fnc, 11)) * Math.log(10);

    return Math.exp(x_exp);
  }

  /**
  * Calculates the normally reflected pressure (kPa) from a spherical air burst.
  * Note: Only works for an angle of incidence of 0 degrees
  *
  * @param t Common Logarithm of scaled distance
  * @return Reflected pressure
  */
  private spherical_Pr(t: number): number {
    let x_exp: number;
    let x_fnc: number;

    x_fnc = 1.35034249993 * t - 0.214362789151;

    x_exp = (3.22958031387 - 2.21400538997 * x_fnc + 0.035119031446 * Math.pow(x_fnc, 2)
      + 0.657599992109 * Math.pow(x_fnc, 3) + 0.0141818951887 * Math.pow(x_fnc, 4)
      - 0.243076636231 * Math.pow(x_fnc, 5) - 0.0158699803158 * Math.pow(x_fnc, 6)
      + 0.0492741184234 * Math.pow(x_fnc, 7) + 0.00227639644004 * Math.pow(x_fnc, 8)
      - 0.00387126276058 * Math.pow(x_fnc, 9)) * Math.log(10);

    return Math.exp(x_exp);
  }

  /**
  * Calculates the Reflected Impulse (kPa-ms).
  *
  * @param t Common logarithm of scaled distance
  * @param W Cube-root of the charge weight
  * @return Reflected impulse
  */
  private hemispherical_Ir(t: number, W: number): number {
    let x_exp: number;
    let x_fnc: number;

    x_fnc = 1.33422049854 * t - 0.246208804814;

    x_exp = (2.70588058103 - 0.949516092853 * x_fnc + 0.112136118689 * Math.pow(x_fnc, 2)
      - 0.0250659183287 * Math.pow(x_fnc, 3)) * Math.log(10);

    return (W * Math.exp(x_exp));
  }

  /**
  * Calculates the spherical Reflected Impulse (kPa-ms).
  *
  * @param t Common Logarithm of scaled distance
  * @param W Cube-root of the charge weight
  * @return spherical reflected impulse
  */
  private spherical_Ir(t: number, W: number): number {
    let x_exp: number;
    let x_fnc: number;

    x_fnc = -0.204004553231 + 1.37882996018 * t;

    x_exp = (2.55875660396 - 0.903118886091 * x_fnc + 0.101771877942 * Math.pow(x_fnc, 2)
      - 0.0242139751146 * Math.pow(x_fnc, 3)) * Math.log(10);

    return (W * Math.exp(x_exp));
  }


  /**
  * Calculates the Shock Front Velocity (m/ms).
  *
  * @param t Common logarithm of scaled distance
  * @param W Cube-root of the charge weight
  * @return Shock front velocity
  */
  private hemispherical_Vs(t: number): number {
    let x_exp: number;
    let x_fnc: number;

    x_fnc = 1.37784223635 * t - 0.202425716178;

    x_exp = (-0.06621072854 - 0.698029762594 * x_fnc + 0.158916781906 * Math.pow(x_fnc, 2)
      + 0.443812098136 * Math.pow(x_fnc, 3) - 0.113402023921 * Math.pow(x_fnc, 4)
      - 0.369887075049 * Math.pow(x_fnc, 5) + 0.129230567449 * Math.pow(x_fnc, 6)
      + 0.19857981197 * Math.pow(x_fnc, 7) - 0.0867636217397 * Math.pow(x_fnc, 8)
      - 0.0620391900135 * Math.pow(x_fnc, 9) + 0.0307482926566 * Math.pow(x_fnc, 10)
      + 0.0102657234407 * Math.pow(x_fnc, 11) - 0.00546533250772 * Math.pow(x_fnc, 12)
      - 0.000693180974 * Math.pow(x_fnc, 13) + 0.0003847494916 * Math.pow(x_fnc, 14))
      * Math.log(10);

    return (Math.exp(x_exp)) * 1000;
  }

  /**
  * Calculates the Shock Front Velocity (m/ms).
  *
  * @param t Common Logarithm of scaled distance
  * @param W Cube-root of the charge weight
  * @return Shock front velocity
  */
  private spherical_Vs(t: number): number {
    let x_exp: number;
    let x_fnc: number;

    x_fnc = -0.214362789151 + 1.35034249993 * t;

    x_exp = (-0.144615443471 - 0.650507560471 * t + 0.291320654009 * Math.pow(x_fnc, 2) + 0.307916322787 * Math.pow(x_fnc, 3)
      - 0.183361123489 * Math.pow(x_fnc, 4) - 0.197740454538 * Math.pow(x_fnc, 5) + 0.0909119559768 * Math.pow(x_fnc, 6)
      + 0.0898926178054 * Math.pow(x_fnc, 7) - 0.0287370990248 * Math.pow(x_fnc, 8) - 0.0248730221702 * Math.pow(x_fnc, 9)
      + 0.00496311705671 * Math.pow(x_fnc, 10) + 0.00372242076361 * Math.pow(x_fnc, 11) - 0.0003533736952 * Math.pow(x_fnc, 12)
      - 0.0002292913709 * Math.pow(x_fnc, 13)) * Math.log(10);

    return (Math.exp(x_exp)) * 1000;
  }


  /**
  * Calculates the Decay Coefficient.
  *
  * @param I Impulse
  * @param P Pressure
  * @param t Positive phase duration
  * @return Decay coefficient
  */
  private decay_coeff(I: number, P: number, t: number): number {
    let k: number;
    let newval: number;
    //Used to find the roots of the equation
    let posval: number;
    let negval: number;
    let valfound: boolean;

    valfound = false; //Used to indicate whether a value has been found


    k = I / (P * t);
    newval = 0.000001;
    posval = 0.000001;
    negval = 0.000001;

    if (this.function_val(newval, k) > 0) {
      posval = newval;

      do {
        posval = newval;
        newval += 0.5;
      } while (this.function_val(newval, k) > 0);

      negval = newval;
    }
    else {
      negval = newval;
      do {
        negval = newval;
        newval -= 0.50;
      } while (this.function_val(newval, k) < 0);

      posval = newval;

    }

    do {
      if (Math.abs(this.function_val(newval, k)) < 0.00001)
        valfound = true;
      else {
        valfound = false;
        if (this.function_val(newval, k) > 0)
          posval = newval;
        else
          negval = newval;

        newval = negval - Math.abs(posval - negval) * this.function_val(posval, k)
          / (this.function_val(posval, k) + Math.abs(this.function_val(negval, k)));
      }

    } while (valfound == false);

    return newval;
  }

  /**
  * @param x double
  * @param k double
  * @return Evaluated value of the function
  */
  private function_val(x: number, k: number): number {
    return (1 - (1 - Math.exp(-x)) / x) / x - k;
  }


  private peak_dynamic_pressure() {
    return ((5 * Math.pow(this.Pso, 2)) / (2* ( this.Pso + 7 * this.Po ) ) );
  }

  private det_b() {
    this.b = 0.1;
    this.IrDet = this.Pr * this.td_pos * ((1 / this.b) - (1 / Math.pow(this.b,2) ) * (1 - Math.exp(-this.b) ));
    while ((this.Ir - this.IrDet) < 0) {
      this.IrDet = this.Pr * this.td_pos * ((1 / this.b) - (1 / Math.pow(this.b,2) ) * (1 - Math.exp(-this.b) ));
      this.b += 0.001;
    }
    return this.b;
  }


}
