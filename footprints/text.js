module.exports = {
  params: {
    layer: "F.SilkS",
    text: "",
    h_size: 1,
    v_size: 1,
    thickness: 0.15,
    justify: "",
  },
  body: (p) => {
    let justify = "";
    if (p.justify != "") {
      justify = `(justify ${p.justify})`;
    }

    return `
            (gr_text "${p.text}" ${p.at} (layer ${p.layer})
                (effects (font (size ${p.h_size} ${p.v_size}) (thickness ${p.thickness})) ${justify})
            )
        `;
  },
};
