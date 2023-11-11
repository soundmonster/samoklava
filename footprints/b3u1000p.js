module.exports = {
    params: {
        designator: 'B', // for Button
        r1: {type: 'net', value: 'GND'},
        r2: {type: 'net', value: 'RST'},
	    reverse: true
    },
    body: p => {
	    const standard = `
	(module Button_Switch_SMD:SW_SPST_B3U-1000P (layer F.Cu) (tedit 5A02FC95)
        ${p.at /* parametric position */}
		${'' /* footprint reference */}
		(fp_text reference "${p.ref}" (at 0 2.55) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))))
		(fp_text value "" (at 0 -2.55) (layer F.Fab) (effects (font (size 1 1) (thickness 0.15))))
	  (descr "Ultra-small-sized Tactile Switch with High Contact Reliability, Top-actuated Model, without Ground Terminal, without Boss")
	  (tags "Tactile Switch")
	  (attr smd)
	  (fp_circle (center 0 0) (end 0.75 0) (layer F.Fab) (width 0.1))
	  (fp_line (start -1.5 1.25) (end -1.5 -1.25) (layer F.Fab) (width 0.1))
	  (fp_line (start 1.5 1.25) (end -1.5 1.25) (layer F.Fab) (width 0.1))
	  (fp_line (start 1.5 -1.25) (end 1.5 1.25) (layer F.Fab) (width 0.1))
	  (fp_line (start -1.5 -1.25) (end 1.5 -1.25) (layer F.Fab) (width 0.1))
	  (fp_line (start -2.4 -1.65) (end -2.4 1.65) (layer F.CrtYd) (width 0.05))
	  (fp_line (start 2.4 -1.65) (end -2.4 -1.65) (layer F.CrtYd) (width 0.05))
	  (fp_line (start 2.4 1.65) (end 2.4 -1.65) (layer F.CrtYd) (width 0.05))
	  (fp_line (start -2.4 1.65) (end 2.4 1.65) (layer F.CrtYd) (width 0.05))
	  (fp_text user %R (at 0 -2.5) (layer F.Fab)
	    (effects (font (size 1 1) (thickness 0.15)))
	  )

	      `
	    function pins(def_neg, def_pos, def_side) {
		  return `
		    ${''/* pins */}
	  (pad 1 smd rect (at ${def_neg}1.7 0) (size 0.9 1.7) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${p.r1.str})
	  (pad 2 smd rect (at ${def_pos}1.7 0) (size 0.9 1.7) (layers ${def_side}.Cu ${def_side}.Paste ${def_side}.Mask) ${p.r2.str})
		  `
	    }
	    if(p.reverse) {
	      return `
		${standard}
		${pins('-', '', 'B')}
		${pins('-', '', 'F')})
		`
	    } else {
	      return `
		${standard}
		${pins('-', '', 'B')})
		`
	    }
	}
}