export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface PaintCalculation extends Dimensions {
  paintType: 'matte' | 'gloss';
  mode: 'full' | 'walls';
}

export interface FlooringCalculation extends Dimensions {
  flooringType: 'hardwood' | 'laminate' | 'tile';
}

export interface DrywallCalculation extends Dimensions {
  thickness: 'half' | 'fiveEighths';
}

export interface MaterialPrices {
  paint: {
    matte: number;
    gloss: number;
  };
  flooring: {
    hardwood: number;
    laminate: number;
    tile: number;
  };
  drywall: {
    half: number;
    fiveEighths: number;
  };
}