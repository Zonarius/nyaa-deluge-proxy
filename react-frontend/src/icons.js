const limits = [4, 2, 3, 4, 2, 2];

const icons = {}

for (let i = 0; i < limits.length; i++) {
  for (let j = 0; j < limits[i]; j++) {
    const name = `${i+1}_${j+1}`
    icons[name] = require(`./icons/${name}.png`)
  }
}

export default icons;