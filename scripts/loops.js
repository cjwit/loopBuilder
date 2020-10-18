var melodyLoop = {
  tempo: 108,
  parts: [
    {
      name: "Melody",
      pattern: ["C5", "C6", null, "F5", null, "Eb5", "Bb4", null],
    }
  ]
}

var bassLoop = {
  tempo: 108,
  parts: [
    {
      name: "Bass",
      pattern: ["C3", null, null, "G2", "Bb3", null, "G3", null],
    }
  ]
}

var drumLoop = {
  tempo: 108,
  parts: [
    {
      name: "Kick drum",
      note: "A3",
      pattern: [1, 0, 0, 0, 1, 0, 0, 0],
    },
    {
      name: "Snare drum",
      note: "A2",
      pattern: [0, 0, 1, 1, 0, 0, 1, 0],
    },
    {
      name: "Cowbell",
      note: "A9",
      pattern: [0, 0, 1, 0, 0, 1, 0, 0],
    }
  ]
}

export var loops = {
  drumLoop: drumLoop,
  melodyLoop: melodyLoop,
  bassLoop: bassLoop
}