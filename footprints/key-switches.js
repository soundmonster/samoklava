// Any MX switch
// Nets
//    from: corresponds to pin 1
//    to: corresponds to pin 2
// Params
//    hotswap: default is false
//      if true, will include holes and pads for Kailh MX hotswap sockets
//    reverse: default is false
//      if true, will flip the footprint such that the pcb can be reversible 
//    keycaps: default is false
//      if true, will add choc sized keycap box around the footprint
//
// note: hotswap and reverse can be used simultaneously

module.exports = {
    params: {
        designator: 'S',
        mx: true,
        mx_hotswap: false,
        mx_reverse: false,
        mx_pth: false,
        choc: false,
        choc_hotswap: false,
        choc_reverse: false,
        choc_pth: false,

        keycaps: false,
        from: undefined,
        to: undefined
    },
    body: p => {
        const standard = `
        (module key-switches (layer F.Cu) (tedit 5DD4F656)
        ${p.at /* parametric position */}
  
        ${'' /* footprint reference */}
        (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
        (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))
        `
        const mx_corner_marks = `
        ${''/* corner marks */}
        (fp_line (start -7 -6) (end -7 -7) (layer Dwgs.User) (width 0.15))
        (fp_line (start -7 7) (end -6 7) (layer Dwgs.User) (width 0.15))
        (fp_line (start -6 -7) (end -7 -7) (layer Dwgs.User) (width 0.15))
        (fp_line (start -7 7) (end -7 6) (layer Dwgs.User) (width 0.15))
        (fp_line (start 7 6) (end 7 7) (layer Dwgs.User) (width 0.15))
        (fp_line (start 7 -7) (end 6 -7) (layer Dwgs.User) (width 0.15))
        (fp_line (start 6 7) (end 7 7) (layer Dwgs.User) (width 0.15))
        (fp_line (start 7 -7) (end 7 -6) (layer Dwgs.User) (width 0.15))
      `
        const choc_corner_marks = `
        ${''/* corner marks */}
        (fp_line (start -7 -6) (end -7 -7) (layer Dwgs.User) (width 0.15))
        (fp_line (start -7 7) (end -6 7) (layer Dwgs.User) (width 0.15))
        (fp_line (start -6 -7) (end -7 -7) (layer Dwgs.User) (width 0.15))
        (fp_line (start -7 7) (end -7 6) (layer Dwgs.User) (width 0.15))
        (fp_line (start 7 6) (end 7 7) (layer Dwgs.User) (width 0.15))
        (fp_line (start 7 -7) (end 6 -7) (layer Dwgs.User) (width 0.15))
        (fp_line (start 6 7) (end 7 7) (layer Dwgs.User) (width 0.15))
        (fp_line (start 7 -7) (end 7 -6) (layer Dwgs.User) (width 0.15))
      `

        const mx_shafts = `
        ${''/* middle shaft */}
        (pad "" np_thru_hole circle (at 0 0) (size 3.9878 3.9878) (drill 3.9878) (layers *.Cu *.Mask))
  
        ${''/* stabilizers */}
        (pad "" np_thru_hole circle (at 5.08 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
        (pad "" np_thru_hole circle (at -5.08 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
        `

        const choc_shaft = `
        ${''/* middle shaft */}
        (pad "" np_thru_hole circle (at 0 0) (size 3.429 3.429) (drill 3.429) (layers *.Cu *.Mask))
            
        ${''/* stabilizers */}
        (pad "" np_thru_hole circle (at 5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
        (pad "" np_thru_hole circle (at -5.5 0) (size 1.7018 1.7018) (drill 1.7018) (layers *.Cu *.Mask))
      `
        const mx_keycap = `
        ${'' /* keycap marks */}
        (fp_line (start -9.5 -9.5) (end 9.5 -9.5) (layer Dwgs.User) (width 0.15))
        (fp_line (start 9.5 -9.5) (end 9.5 9.5) (layer Dwgs.User) (width 0.15))
        (fp_line (start 9.5 9.5) (end -9.5 9.5) (layer Dwgs.User) (width 0.15))
        (fp_line (start -9.5 9.5) (end -9.5 -9.5) (layer Dwgs.User) (width 0.15))
        `
        const choc_keycap = `
        ${'' /* keycap marks */}
        (fp_line (start -9 -8.5) (end 9 -8.5) (layer Dwgs.User) (width 0.15))
        (fp_line (start 9 -8.5) (end 9 8.5) (layer Dwgs.User) (width 0.15))
        (fp_line (start 9 8.5) (end -9 8.5) (layer Dwgs.User) (width 0.15))
        (fp_line (start -9 8.5) (end -9 -8.5) (layer Dwgs.User) (width 0.15))
      `

        function mx_pins(def_neg, def_pos, def_side) {
            let pad_1 = '1'
            let pad_2 = '2'
            let pad_1_net = p.from.str
            let pad_2_net = p.to.str
            if (p.mx_pth){
                pad_1 = (def_side == 'B') ? '1' : '2'
                pad_2 = (def_side == 'B') ? '2' : '1'
                pad_1_net = (def_side == 'B') ? p.from.str : p.to.str
                pad_2_net = (def_side == 'B') ? p.to.str : p.from.str
                return `
                ${'' /* holes */}
                (pad ${pad_1} thru_hole circle (at ${def_pos}2.54 5.08) (size 3.6 3.6) (drill 3) (layers *.Cu *.Mask) ${pad_1_net})
                (pad ${pad_2} thru_hole circle (at ${def_neg}3.81 2.54) (size 3.6 3.6) (drill 3) (layers *.Cu *.Mask) ${pad_2_net})
                
                ${'' /* net pads */}
                (pad ${pad_2} smd rect (at ${def_neg}7.085 2.54 ${p.rot}) (size 2.5 2.5) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${pad_2_net})
                (pad ${pad_1} smd rect (at ${def_pos}5.842 5.08 ${p.rot}) (size 2.5 2.5) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${pad_1_net})
                ${'' /* net pads to connect to holes */}
                (pad ${pad_2} smd rect (at ${def_neg}6 2.54 ${p.rot}) (size 3 1) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${pad_2_net})
                (pad ${pad_1} smd rect (at ${def_pos}4.5 5.08 ${p.rot}) (size 3 1) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${pad_1_net})
                `
            }
            else if (p.mx_hotswap) {
                return `
                ${'' /* holes */}
                (pad "" np_thru_hole circle (at ${def_pos}2.54 5.08) (size 3 3) (drill 3) (layers *.Cu *.Mask))
                (pad "" np_thru_hole circle (at ${def_neg}3.81 2.54) (size 3 3) (drill 3) (layers *.Cu *.Mask))
                
                ${'' /* net pads */}
                (pad ${pad_2} smd rect (at ${def_neg}7.085 2.54 ${p.rot}) (size 2.55 2.5) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${pad_2_net})
                (pad ${pad_1} smd rect (at ${def_pos}5.842 5.08 ${p.rot}) (size 2.55 2.5) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${pad_1_net})
                `
            } else {
                return `
                ${''/* pins */}
                (pad ${pad_2} thru_hole circle (at ${def_pos}2.54 5.08) (size 2.286 2.286) (drill 1.4986) (layers *.Cu *.Mask) ${pad_2_net})
                (pad ${pad_1} thru_hole circle (at ${def_neg}3.81 2.54) (size 2.286 2.286) (drill 1.4986) (layers *.Cu *.Mask) ${pad_1_net})
                `
            }
        }

        function choc_pins(def_neg, def_pos, def_side) {
            if (p.choc_pth){
                return `
                ${'' /* holes */}
                (pad "" np_thru_hole circle (at ${def_pos}5 -3.75) (size 3 3) (drill 3) (layers *.Cu *.Mask))
                (pad 1 thru_hole circle (at 0 -5.95) (size 3.6 3.6) (drill 3) (layers *.Cu *.Mask)  ${p.from.str})
            
                ${'' /* net pads */}
                (pad 1 smd rect (at ${def_neg}2.8 -5.95 ${p.rot}) (size 1.7 1.8) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask)  ${p.from.str})
                (pad 2 smd rect (at ${def_pos}8.275 -3.75 ${p.rot}) (size 2 2) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask)  ${p.to.str})
                ${'' /* net pads to connect to holes */}
                (pad 1 smd rect (at ${def_neg}2 -5.95  ${p.rot}) (size 2 1) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${p.from.str})
                (pad 2 smd rect (at ${def_pos}7 -3.75 ${p.rot}) (size 2 1) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${p.to.str})
                `
            }
            else if (p.choc_hotswap) {
                return `
                ${'' /* holes */}
                (pad "" np_thru_hole circle (at ${def_pos}5 -3.75) (size 3 3) (drill 3) (layers *.Cu *.Mask))
                (pad "" np_thru_hole circle (at 0 -5.95) (size 3 3) (drill 3) (layers *.Cu *.Mask))
            
                ${'' /* net pads */}
                (pad 1 smd rect (at ${def_neg}3.275 -5.95 ${p.rot}) (size 2.6 2.6) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask)  ${p.from.str})
                (pad 2 smd rect (at ${def_pos}8.275 -3.75 ${p.rot}) (size 2.6 2.6) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask)  ${p.to.str})
                `
            } else {
                return `
                ${''/* pins */}
                (pad 1 thru_hole circle (at ${def_pos}5 -3.8) (size 2.032 2.032) (drill 1.27) (layers *.Cu *.Mask) ${p.from.str})
                (pad 2 thru_hole circle (at ${def_pos}0 -5.9) (size 2.032 2.032) (drill 1.27) (layers *.Cu *.Mask) ${p.to.str})
                `
            }
        }


        let return_val = `${standard}`

        if (p.mx){
            return_val += `
            ${mx_corner_marks}
            ${p.keycaps ? mx_keycap : ''}
            ${mx_shafts}
            ${mx_pins('', '-', 'B')}
            `
            if (p.mx_reverse){
                return_val += `${mx_pins('-', '', 'F')}`
            }
        }

        if (p.choc & !p.mx){
            return_val += `
            ${choc_corner_marks}
            ${p.keycaps ? choc_keycap : ''}
            `
        }

        if (p.choc){
            return_val += `
            ${choc_shaft}
            ${choc_pins('-', '', 'B')}
            `
            if (p.choc_reverse){
                return_val += `${choc_pins('', '-', 'F')}`
            }
        }
        
        return `
        ${return_val})
        `
    }
}