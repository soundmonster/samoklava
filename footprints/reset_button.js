module.exports = {
    params: {
        designator: 'B', // for Button
        from: undefined,
        to: undefined
    },
    body: p => {
            // this footprint goes to both sides by default so it ignores the layer setting
            return `
            (module kbd:ResetSW (layer F.Cu) (tedit 5B9559E6) (tstamp 61905781)

                (descr "Two pin through hole Tactile Switch, the same as on the Corne")
                (tags "Tactile Switch")

                ${p.at /* parametric position */}
                ${'' /* footprint reference */}
                (fp_text reference "${p.ref}" (at 0 2.55) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15))))
                (fp_text value "" (at 0 -2.55) (layer F.Fab) (effects (font (size 1 1) (thickness 0.15))))

                ${'' /* outline */}
                (fp_text user RESET (at 0 0 ${p.rot}) (layer F.SilkS) (effects (font (size 1 1) (thickness 0.15))))
                (fp_text user RESET (at 0.127 0 ${p.rot}) (layer B.SilkS) (effects (font (size 1 1) (thickness 0.15)) (justify mirror)))

                (fp_line (start 3 1.5) (end 3 1.75) (layer B.SilkS) (width 0.15))
                (fp_line (start 3 1.75) (end -3 1.75) (layer B.SilkS) (width 0.15))
                (fp_line (start -3 1.75) (end -3 1.5) (layer B.SilkS) (width 0.15))
                (fp_line (start -3 -1.5) (end -3 -1.75) (layer B.SilkS) (width 0.15))
                (fp_line (start -3 -1.75) (end 3 -1.75) (layer B.SilkS) (width 0.15))
                (fp_line (start 3 -1.75) (end 3 -1.5) (layer B.SilkS) (width 0.15))
                (fp_line (start -3 1.75) (end 3 1.75) (layer F.SilkS) (width 0.15))
                (fp_line (start 3 1.75) (end 3 1.5) (layer F.SilkS) (width 0.15))
                (fp_line (start -3 1.75) (end -3 1.5) (layer F.SilkS) (width 0.15))
                (fp_line (start -3 -1.75) (end -3 -1.5) (layer F.SilkS) (width 0.15))
                (fp_line (start -3 -1.75) (end 3 -1.75) (layer F.SilkS) (width 0.15))
                (fp_line (start 3 -1.75) (end 3 -1.5) (layer F.SilkS) (width 0.15))

                ${'' /* pins */}
                (pad 2 thru_hole circle (at -3.25 0 ${p.rot}) (size 2 2) (drill 1.3) (layers *.Cu *.Mask F.SilkS) ${p.from.str})
                (pad 1 thru_hole circle (at 3.25 0 ${p.rot}) (size 2 2) (drill 1.3) (layers *.Cu *.Mask F.SilkS) ${p.to.str})
            )
            `
    }
}
