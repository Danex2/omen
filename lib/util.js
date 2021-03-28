module.exports = {
  formatDate: (date) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
      timeStyle: "full",
    }).format(new Date(date));
  },
};
