module.exports = {
  formatDate: (date) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "full",
    }).format(new Date(date));
  },
  groupBy: (array, prop) => {
    // https://stackoverflow.com/questions/40774697/how-to-group-an-array-of-objects-by-key
    return array.reduce(function (groups, item) {
      const val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  },
};
