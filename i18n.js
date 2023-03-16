module.exports = {
  locales: ["en", "ro"], // Array with the languages that you want to use
  defaultLocale: "ro", // Default language of your website
  pages: {
    "*": ["locale"], // Namespaces that you want to import per page (we stick to one namespace for all the application in this tutorial)
  },
};
