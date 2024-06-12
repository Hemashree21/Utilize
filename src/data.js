export const loadIcons = () => {
    try {
      const context = require.context('./assets', false, /\.svg$/);
      return context.keys().map(context);
    } catch (error) {
      console.error("Error loading icons:", error);
      return [];
    }
  };
  