export const colors = {
  green: "#28cc75",
  blue: "#298eea",
  red: "#ff6768",
  yellow: "#feee7d",
};

export const pointColors = {
  0: "#878787", // empty
  1: "#28cc75", // green
  2: "#298eea", // blue
  3: "#ff6768", // red
  4: "#feee7d", // yellow
  5: "#28cc75", // green empty
  6: "#298eea", // blue empty
  7: "#ff6768", // red empty
  8: "#feee7d", // yellow empty
  9: "#298eea", // blue is captured by green
  10: "#ff6768", // red is captured by green
  11: "#feee7d", // yellow is captured by green
  12: "#28cc75", // green is captured by blue
  13: "#ff6768", // red is captured by blue
  14: "#feee7d", // yellow is captured by blue
  15: "#28cc75", // green is captured by red
  16: "#298eea", // blue is captured by red
  17: "#feee7d", // yellow is captured by red
  18: "#28cc75", // green is captured by yellow
  19: "#298eea", // blue is captured by yellow
  20: "#ff6768", // red is captured by yellow
};

export const colorsData = {
  green: [1, 5, [-1, 9, 10, 11]],
  blue: [2, 6, [12, -1, 13, 14]],
  red: [3, 7, [15, 16, -1, 17]],
  yellow: [4, 8, [18, 19, 20, -1]],
};
