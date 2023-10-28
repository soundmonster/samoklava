// Arduino ProMicro atmega32u4au
// Params
//  orientation: default is down
//    if down, power led will face the pcb
//    if up, power led will face away from pcb

module.exports = {
  params: {
    designator: 'MCU',
    orientation: 'down',
    RAW: {type: 'net', value: 'RAW'},
    GND: {type: 'net', value: 'GND'},
    RST: {type: 'net', value: 'RST'},
    VCC: {type: 'net', value: 'VCC'},
    P21: {type: 'net', value: 'P21'},
    P20: {type: 'net', value: 'P20'},
    P19: {type: 'net', value: 'P19'},
    P18: {type: 'net', value: 'P18'},
    P15: {type: 'net', value: 'P15'},
    P14: {type: 'net', value: 'P14'},
    P16: {type: 'net', value: 'P16'},
    P10: {type: 'net', value: 'P10'},
    P1: {type: 'net', value: 'P1'},
    P0: {type: 'net', value: 'P0'},
    P2: {type: 'net', value: 'P2'},
    P3: {type: 'net', value: 'P3'},
    P4: {type: 'net', value: 'P4'},
    P5: {type: 'net', value: 'P5'},
    P6: {type: 'net', value: 'P6'},
    P7: {type: 'net', value: 'P7'},
    P8: {type: 'net', value: 'P8'},
    P9: {type: 'net', value: 'P9'}
  },
  body: p => {
    const standard = `
      (module ProMicro (layer F.Cu) (tedit 5B307E4C)
      ${p.at /* parametric position */}

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
      (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))
    
      ${''/* illustration of the (possible) USB port overhang */}
      (fp_line (start -19.304 -3.81) (end -14.224 -3.81) (layer Dwgs.User) (width 0.15))
      (fp_line (start -19.304 3.81) (end -19.304 -3.81) (layer Dwgs.User) (width 0.15))
      (fp_line (start -14.224 3.81) (end -19.304 3.81) (layer Dwgs.User) (width 0.15))
      (fp_line (start -14.224 -3.81) (end -14.224 3.81) (layer Dwgs.User) (width 0.15))
      `
    function pins(def_neg, def_pos, layer) {
      return `
        ${''/* component outline */}
        (fp_line (start -17.78 ${def_pos}8.89) (end 15.24 ${def_pos}8.89) (layer ${layer}.SilkS) (width 0.15))
        (fp_line (start 15.24 ${def_pos}8.89) (end 15.24 ${def_neg}8.89) (layer ${layer}.SilkS) (width 0.15))
        (fp_line (start 15.24 ${def_neg}8.89) (end -17.78 ${def_neg}8.89) (layer ${layer}.SilkS) (width 0.15))
        (fp_line (start -17.78 ${def_neg}8.89) (end -17.78 ${def_pos}8.89) (layer ${layer}.SilkS) (width 0.15))


        ${''/* extra border around "RAW", in case the rectangular shape is not distinctive enough */}
        (fp_line (start -15.24 ${def_pos}6.35) (end -12.7 ${def_pos}6.35) (layer ${layer}.SilkS) (width 0.15))
        (fp_line (start -15.24 ${def_pos}6.35) (end -15.24 ${def_pos}8.89) (layer ${layer}.SilkS) (width 0.15))
        (fp_line (start -12.7 ${def_pos}6.35) (end -12.7 ${def_pos}8.89) (layer ${layer}.SilkS) (width 0.15))
      
        ${''/* pin names */}
        (fp_text user RAW (at -13.97 ${def_pos}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user GND (at -11.43 ${def_pos}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user RST (at -8.89 ${def_pos}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user VCC (at -6.35 ${def_pos}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user P21 (at -3.81 ${def_pos}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user P20 (at -1.27 ${def_pos}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user P19 (at 1.27 ${def_pos}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user P18 (at 3.81 ${def_pos}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user P15 (at 6.35 ${def_pos}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user P14 (at 8.89 ${def_pos}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user P16 (at 11.43 ${def_pos}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user P10 (at 13.97 ${def_pos}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
      
        (fp_text user P01 (at -13.97 ${def_neg}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user P00 (at -11.43 ${def_neg}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user GND (at -8.89 ${def_neg}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user GND (at -6.35 ${def_neg}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user P02 (at -3.81 ${def_neg}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user P03 (at -1.27 ${def_neg}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user P04 (at 1.27 ${def_neg}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user P05 (at 3.81 ${def_neg}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user P06 (at 6.35 ${def_neg}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user P07 (at 8.89 ${def_neg}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user P08 (at 11.43 ${def_neg}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        (fp_text user P09 (at 13.97 ${def_neg}4.8 ${p.rot + 90}) (layer ${layer}.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15))))
        
        (fp_circle (center 13.97 0.762) (end 14.095 0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center 13.97 -0.762) (end 14.095 -0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center 11.43 0.762) (end 11.555 0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center 11.43 -0.762) (end 11.555 -0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center 8.89 0.762) (end 9.015 0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center 8.89 -0.762) (end 9.015 -0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center 6.35 0.762) (end 6.475 0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center 6.35 -0.762) (end 6.475 -0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center 3.81 0.762) (end 3.935 0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center 3.81 -0.762) (end 3.935 -0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center 1.27 0.762) (end 1.395 0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center 1.27 -0.762) (end 1.395 -0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center -1.27 0.762) (end -1.145 0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center -1.27 -0.762) (end -1.145 -0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center -3.81 0.762) (end -3.685 0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center -3.81 -0.762) (end -3.685 -0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center -6.35 0.762) (end -6.225 0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center -6.35 -0.762) (end -6.225 -0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center -8.89 0.762) (end -8.765 0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center -8.89 -0.762) (end -8.765 -0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center -11.43 -0.762) (end -11.305 -0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center -11.43 0.762) (end -11.305 0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center -13.97 0.762) (end -13.845 0.762) (layer ${layer}.Mask) (width 0.25))
        (fp_circle (center -13.97 -0.762) (end -13.845 -0.762) (layer ${layer}.Mask) (width 0.25))
      `
    }
    const connectors = `
    (fp_poly (pts (xy 14.478 -5.08) (xy 13.462 -5.08) (xy 13.462 -6.096) (xy 14.478 -6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy 11.938 -5.08) (xy 10.922 -5.08) (xy 10.922 -6.096) (xy 11.938 -6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy 9.398 -5.08) (xy 8.382 -5.08) (xy 8.382 -6.096) (xy 9.398 -6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy 6.858 -5.08) (xy 5.842 -5.08) (xy 5.842 -6.096) (xy 6.858 -6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy 4.318 -5.08) (xy 3.302 -5.08) (xy 3.302 -6.096) (xy 4.318 -6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy 1.778 -5.08) (xy 0.762 -5.08) (xy 0.762 -6.096) (xy 1.778 -6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy -0.762 -5.08) (xy -1.778 -5.08) (xy -1.778 -6.096) (xy -0.762 -6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy -3.302 -5.08) (xy -4.318 -5.08) (xy -4.318 -6.096) (xy -3.302 -6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy -5.842 -5.08) (xy -6.858 -5.08) (xy -6.858 -6.096) (xy -5.842 -6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy -8.382 -5.08) (xy -9.398 -5.08) (xy -9.398 -6.096) (xy -8.382 -6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy -10.922 -5.08) (xy -11.938 -5.08) (xy -11.938 -6.096) (xy -10.922 -6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy -13.462 -5.08) (xy -14.478 -5.08) (xy -14.478 -6.096) (xy -13.462 -6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy 13.462 5.08) (xy 14.478 5.08) (xy 14.478 6.096) (xy 13.462 6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy 10.922 5.08) (xy 11.938 5.08) (xy 11.938 6.096) (xy 10.922 6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy 8.382 5.08) (xy 9.398 5.08) (xy 9.398 6.096) (xy 8.382 6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy 5.842 5.08) (xy 6.858 5.08) (xy 6.858 6.096) (xy 5.842 6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy 3.302 5.08) (xy 4.318 5.08) (xy 4.318 6.096) (xy 3.302 6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy 0.762 5.08) (xy 1.778 5.08) (xy 1.778 6.096) (xy 0.762 6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy -1.778 5.08) (xy -0.762 5.08) (xy -0.762 6.096) (xy -1.778 6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy -4.318 5.08) (xy -3.302 5.08) (xy -3.302 6.096) (xy -4.318 6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy -6.858 5.08) (xy -5.842 5.08) (xy -5.842 6.096) (xy -6.858 6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy -9.398 5.08) (xy -8.382 5.08) (xy -8.382 6.096) (xy -9.398 6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy -11.938 5.08) (xy -10.922 5.08) (xy -10.922 6.096) (xy -11.938 6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy -14.478 5.08) (xy -13.462 5.08) (xy -13.462 6.096) (xy -14.478 6.096)) (layer B.Mask) (width 0.1))
    (fp_poly (pts (xy -13.462 -5.08) (xy -14.478 -5.08) (xy -14.478 -6.096) (xy -13.462 -6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy 1.778 -5.08) (xy 0.762 -5.08) (xy 0.762 -6.096) (xy 1.778 -6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy -10.922 -5.08) (xy -11.938 -5.08) (xy -11.938 -6.096) (xy -10.922 -6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy -8.382 -5.08) (xy -9.398 -5.08) (xy -9.398 -6.096) (xy -8.382 -6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy -3.302 -5.08) (xy -4.318 -5.08) (xy -4.318 -6.096) (xy -3.302 -6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy -0.762 -5.08) (xy -1.778 -5.08) (xy -1.778 -6.096) (xy -0.762 -6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy 6.858 -5.08) (xy 5.842 -5.08) (xy 5.842 -6.096) (xy 6.858 -6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy 11.938 -5.08) (xy 10.922 -5.08) (xy 10.922 -6.096) (xy 11.938 -6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy -5.842 -5.08) (xy -6.858 -5.08) (xy -6.858 -6.096) (xy -5.842 -6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy 4.318 -5.08) (xy 3.302 -5.08) (xy 3.302 -6.096) (xy 4.318 -6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy 9.398 -5.08) (xy 8.382 -5.08) (xy 8.382 -6.096) (xy 9.398 -6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy 14.478 -5.08) (xy 13.462 -5.08) (xy 13.462 -6.096) (xy 14.478 -6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy 13.462 5.08) (xy 14.478 5.08) (xy 14.478 6.096) (xy 13.462 6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy 10.922 5.08) (xy 11.938 5.08) (xy 11.938 6.096) (xy 10.922 6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy 8.382 5.08) (xy 9.398 5.08) (xy 9.398 6.096) (xy 8.382 6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy 5.842 5.08) (xy 6.858 5.08) (xy 6.858 6.096) (xy 5.842 6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy 3.302 5.08) (xy 4.318 5.08) (xy 4.318 6.096) (xy 3.302 6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy 0.762 5.08) (xy 1.778 5.08) (xy 1.778 6.096) (xy 0.762 6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy -1.778 5.08) (xy -0.762 5.08) (xy -0.762 6.096) (xy -1.778 6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy -4.318 5.08) (xy -3.302 5.08) (xy -3.302 6.096) (xy -4.318 6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy -6.858 5.08) (xy -5.842 5.08) (xy -5.842 6.096) (xy -6.858 6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy -9.398 5.08) (xy -8.382 5.08) (xy -8.382 6.096) (xy -9.398 6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy -11.938 5.08) (xy -10.922 5.08) (xy -10.922 6.096) (xy -11.938 6.096)) (layer F.Mask) (width 0.1))
    (fp_poly (pts (xy -14.478 5.08) (xy -13.462 5.08) (xy -13.462 6.096) (xy -14.478 6.096)) (layer F.Mask) (width 0.1))
    `
    const through_holes = `
      (pad "" thru_hole circle (at -13.97 7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask)
        (zone_connect 0))
      (pad "" thru_hole circle (at -11.43 7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at -8.89 7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at -6.35 7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at -3.81 7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at -1.27 7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at 1.27 7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at 3.81 7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at 6.35 7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at 8.89 7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at 11.43 7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at 13.97 7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at 13.97 -7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at 11.43 -7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at 8.89 -7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at 6.35 -7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at 3.81 -7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at 1.27 -7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at -1.27 -7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at -3.81 -7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at -6.35 -7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at -8.89 -7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at -11.43 -7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      (pad "" thru_hole circle (at -13.97 -7.62) (size 1.6 1.6) (drill 1.1) (layers *.Cu *.Mask))
      `

    
    function unnumbered_pads(def_pos_x, def_x, def_pos_y, layer) {
      if (def_pos_y == '-'){
        rot = p.rot
      }
      else{
        rot = p.rot + 180
      }
      return `
      (pad "" smd custom (at ${def_pos_x}${def_x} ${def_pos_y}5.842 ${rot}) (size 0.1 0.1) (layers ${layer}.Cu ${layer}.Mask)
          (clearance 0.1) (zone_connect 0)
          (options (clearance outline) (anchor rect))
          (primitives
            (gr_poly (pts
              (xy 0.6 -0.4) (xy -0.6 -0.4) (xy -0.6 -0.2) (xy 0 0.4) (xy 0.6 -0.2)
      ) (width 0))
          ))
      (pad "" smd custom (at ${def_pos_x}${def_x} ${def_pos_y}6.35 ${rot}) (size 0.25 1) (layers ${layer}.Cu)
          (zone_connect 0)
          (options (clearance outline) (anchor rect))
          (primitives
          ))
      `
    }

    const x_vals = [13.97, 11.43, 8.89, 6.35, 3.81, 1.27];
    const pos_vals = ['-', '']
    const layers = ['F', 'B']
    let all_unnumbered_pads = ''

    for (let x_val of x_vals) {
        for (let pos_val_x of pos_vals) {
            for (let pos_val_y of pos_vals) {
              for (let _layer of layers){
                all_unnumbered_pads += unnumbered_pads(pos_val_x, x_val, pos_val_y, _layer);
              }
            }
        }
    }
    const rect_pads = `
      (pad "" thru_hole rect (at -13.97 7.62 ${p.rot}) (size 1.6 1.6) (drill 1.1) (layers F.Cu F.Mask)
        (zone_connect 0))
      (pad "" thru_hole rect (at -13.97 -7.62 ${p.rot}) (size 1.6 1.6) (drill 1.1) (layers B.Cu B.Mask)
        (zone_connect 0))
    `

    function numbered_pads(pad_number, net_str, x_val, pos_val){
      if (pos_val == '-'){
        _layers = ['F', 'B']
        line_val_1 = '0.766'
        line_val_2 = '3.298'
        rot = p.rot
      }
      else{
        _layers = ['B', 'F']
        line_val_1 = '0.762'
        line_val_2 = '3.302'
        rot = p.rot + 180
      }
      return `

      (pad ${pad_number} thru_hole circle (at ${x_val} ${pos_val}0.762 ${p.rot + 180}) (size 0.8 0.8) (drill 0.4) (layers *.Cu) ${net_str})
      (pad ${pad_number} smd custom (at ${x_val} 4.826 ${p.rot + 180}) (size 1.2 0.5) (layers ${_layers[1]}.Cu ${_layers[1]}.Mask) ${net_str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly (pts
            (xy 0.6 0) (xy -0.6 0) (xy -0.6 -1) (xy 0 -0.4) (xy 0.6 -1)
      ) (width 0))
          ))
      (pad ${pad_number} smd custom (at ${x_val} -4.826 ${p.rot}) (size 1.2 0.5) (layers ${_layers[0]}.Cu ${_layers[0]}.Mask) ${net_str}
        (clearance 0.1) (zone_connect 0)
        (options (clearance outline) (anchor rect))
        (primitives
          (gr_poly (pts
            (xy 0.6 0) (xy -0.6 0) (xy -0.6 -1) (xy 0 -0.4) (xy 0.6 -1)
      ) (width 0))
          ))
      (pad ${pad_number} smd custom (at ${x_val} ${pos_val}0.762 ${rot}) (size 0.25 0.25) (layers F.Cu) ${net_str}
        (zone_connect 0)
        (options (clearance outline) (anchor circle))
        (primitives
          (gr_line (start 0 0) (end ${line_val_1} -${line_val_1}) (width 0.25))
          (gr_line (start ${line_val_1} -${line_val_1}) (end ${line_val_1} -${line_val_2}) (width 0.25))
          (gr_line (start ${line_val_1} -${line_val_2}) (end 0 -4.064) (width 0.25))
        ))
      (pad ${pad_number} smd custom (at ${x_val} ${pos_val}0.762 ${rot}) (size 0.25 0.25) (layers B.Cu) ${net_str}
        (zone_connect 0)
        (options (clearance outline) (anchor circle))
        (primitives
          (gr_line (start 0 0) (end -0.766 0.766) (width 0.25))
          (gr_line (start -0.766 0.766) (end -0.766 4.822) (width 0.25))
          (gr_line (start -0.766 4.822) (end 0 5.588) (width 0.25))
        ))
      `
    }

    const all_numbered_pads = `
      ${numbered_pads(1, p.RAW.str, -13.97, '-')}
      ${numbered_pads(2, p.GND.str, -11.43, '-')}
      ${numbered_pads(3, p.RST.str, -8.89, '-')}
      ${numbered_pads(4, p.VCC.str, -6.35, '-')}
      ${numbered_pads(5, p.P21.str, -3.81, '-')}
      ${numbered_pads(6, p.P20.str, -1.27, '-')}
      ${numbered_pads(7, p.P19.str, 1.27, '-')}
      ${numbered_pads(8, p.P18.str, 3.81, '-')}
      ${numbered_pads(9, p.P15.str, 6.35, '-')}
      ${numbered_pads(10, p.P14.str, 8.89, '-')}
      ${numbered_pads(11, p.P16.str, 11.43, '-')}
      ${numbered_pads(12, p.P10.str, 13.97, '-')}
      ${numbered_pads(13, p.P9.str, 13.97, '')}
      ${numbered_pads(14, p.P8.str, 11.43, '')}
      ${numbered_pads(15, p.P7.str, 8.89, '')}
      ${numbered_pads(16, p.P6.str, 6.35, '')}
      ${numbered_pads(17, p.P5.str, 3.81, '')}
      ${numbered_pads(18, p.P4.str, 1.27, '')}
      ${numbered_pads(19, p.P3.str, -1.27, '')}
      ${numbered_pads(20, p.P2.str, -3.81, '')}
      ${numbered_pads(21, p.GND.str, -6.35, '')}
      ${numbered_pads(22, p.GND.str, -8.89, '')}
      ${numbered_pads(23, p.P0.str, -11.43, '')}
      ${numbered_pads(24, p.P1.str, -13.97, '')}
    `

    return `
      ${standard}
      ${pins('-', '', 'F')}
      ${pins('', '-', 'B')}
      ${connectors}
      ${through_holes}
      ${all_unnumbered_pads}
      ${rect_pads}
      ${all_numbered_pads}
      )
    `
  }
}