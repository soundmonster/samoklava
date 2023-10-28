module.exports = {
    params: {
        designator: 'T', // for Toggle
        side: 'F',
        from: undefined,
        left: undefined,
        right: undefined,
        reversible: false
    },
    body: p => {
        const info = `                
            (module E73:SPDT_C128955 (layer F.Cu) (tstamp 5BF2CC3C)

            ${p.at /* parametric position */}

            ${'' /* footprint reference */}
            (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
            (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))
        `
        function get_slider(_side){
            const left = _side == 'F' ? '-' : ''
            const right = _side == 'F' ? '' : '-'

            return `
                
                ${'' /* outline */}
                (fp_line (start 1.95 -1.35) (end -1.95 -1.35) (layer ${_side}.SilkS) (width 0.15))
                (fp_line (start 0 -1.35) (end -3.3 -1.35) (layer ${_side}.SilkS) (width 0.15))
                (fp_line (start -3.3 -1.35) (end -3.3 1.5) (layer ${_side}.SilkS) (width 0.15))
                (fp_line (start -3.3 1.5) (end 3.3 1.5) (layer ${_side}.SilkS) (width 0.15))
                (fp_line (start 3.3 1.5) (end 3.3 -1.35) (layer ${_side}.SilkS) (width 0.15))
                (fp_line (start 0 -1.35) (end 3.3 -1.35) (layer ${_side}.SilkS) (width 0.15))
                
                ${'' /* extra indicator for the slider */}
                (fp_line (start -1.95 -3.85) (end 1.95 -3.85) (layer Dwgs.User) (width 0.15))
                (fp_line (start 1.95 -3.85) (end 1.95 -1.35) (layer Dwgs.User) (width 0.15))
                (fp_line (start -1.95 -1.35) (end -1.95 -3.85) (layer Dwgs.User) (width 0.15))
                
                ${'' /* bottom cutouts */}
                (pad "" np_thru_hole circle (at 1.5 0) (size 1 1) (drill 0.9) (layers *.Cu *.Mask))
                (pad "" np_thru_hole circle (at -1.5 0) (size 1 1) (drill 0.9) (layers *.Cu *.Mask))

                ${'' /* pins */}
                (pad 1 smd rect (at ${right}2.25 2.075 ${p.rot}) (size 0.9 1.25) (layers ${_side}.Cu ${_side}.Paste ${_side}.Mask) ${p.right.str})
                (pad 2 smd rect (at ${left}0.75 2.075 ${p.rot}) (size 0.9 1.25) (layers ${_side}.Cu ${_side}.Paste ${_side}.Mask) ${p.from.str})
                (pad 3 smd rect (at ${left}2.25 2.075 ${p.rot}) (size 0.9 1.25) (layers ${_side}.Cu ${_side}.Paste ${_side}.Mask) ${p.left.str})
                
                ${'' /* side mounts */}
                (pad "" smd rect (at 3.7 -1.1 ${p.rot}) (size 0.9 0.9) (layers ${_side}.Cu ${_side}.Paste ${_side}.Mask))
                (pad "" smd rect (at 3.7 1.1 ${p.rot}) (size 0.9 0.9) (layers ${_side}.Cu ${_side}.Paste ${_side}.Mask))
                (pad "" smd rect (at -3.7 1.1 ${p.rot}) (size 0.9 0.9) (layers ${_side}.Cu ${_side}.Paste ${_side}.Mask))
                (pad "" smd rect (at -3.7 -1.1 ${p.rot}) (size 0.9 0.9) (layers ${_side}.Cu ${_side}.Paste ${_side}.Mask))
            
            `
        }
        
        if (p.reversible){
            return `
            ${info}
            ${get_slider('F')}
            ${get_slider('B')})
            `
        }
        else{
            return `
            ${info}
            ${get_slider(p.side)})
            `
        }
    }
}
