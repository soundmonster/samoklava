module.exports = {
    params: {
        layer: 'F.SilkS',
        text: '',
        h_size: 1,
        v_size: 1,
        thickness: 0.15,
        justify: null
    },
    body: p => {
        justify = p.param.justify && `(justify ${p.param.justify})` || '';
        return `
            (gr_text "${p.param.text}" ${p.at} (layer ${p.param.layer})
                (effects (font (size ${p.param.h_size} ${p.param.v_size}) (thickness ${p.param.thickness})) ${justify})
            )
        `
    }
}
