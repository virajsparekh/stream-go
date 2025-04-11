export const groupByLanguage = (items) => {
    return items.reduce((acc, item) => {
      const language = item.languages?.[0] || "Unknown";
      if (!acc[language]) {
        acc[language] = [];
      }
      acc[language].push(item);
      return acc;
    }, {});
  };
  
  export const getRandomItems = (items, count = 10) => {
    return [...items]
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  };