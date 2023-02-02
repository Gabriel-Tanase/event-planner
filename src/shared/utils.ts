// Generate a random hex color
export const generateHexColor: () => string = () =>
	"#" + Math.floor(Math.random() * 16777215).toString(16);
