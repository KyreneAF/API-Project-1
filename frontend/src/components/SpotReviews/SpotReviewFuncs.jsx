const monthArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dateFormater = (review) => {
  if (review.createdAt) {
    const dateSlice = review.createdAt.slice(0, 10);
    let dateArr = dateSlice.split("-");

    let newDate = `${monthArr[dateArr[1]]} ${dateArr[0]}`;

    return newDate;
  }
};
