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

export const dateFormater = ({review}) => {
  // console.log('INSIDE DATE FORMATER REVIEW' ,review,'CREATED AT',review.createdAt)
  if (review.createdAt) {
    const dateSlice = review.createdAt.slice(0, 10);
    // console.log('DATE SLICE', dateSlice)
    let dateArr = dateSlice.split("-");
    // console.log('DATE ARR', dateArr)
    // console.log('KEYING IN', dateArr[1])
    let newDate = `${monthArr[dateArr[1]-1]} ${dateArr[0]}`;
    // console.log('NEW DATE', newDate)
    return newDate;
  }
};

// export const timeComparer = ({reviewArr}) =>{

// }
