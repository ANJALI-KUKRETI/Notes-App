const formatDate = () => {
  const d = new Date();
  const date = d.getDate();
  let nDate, nMonth;
  if (date > 9) {
    nDate = date;
  } else {
    nDate = `0${date}`;
  }
  const month = d.getMonth() + 1;
  if (month > 9) {
    nMonth = month;
  } else {
    nMonth = `0${month}`;
  }
  const year = d.getFullYear();
  return `${nDate}/${nMonth}/${year}`;
};

export default formatDate;
