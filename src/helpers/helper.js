export const formatDate = (global__date) => {
  const timestamp = global__date.getTime();
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

  const date = new Date(parseInt(timestamp));
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  let currentDay = "";
  if (day < 10) {
    currentDay = "0" + day.toString();
  } else {
    currentDay = day;
  }
  const format = `${currentDay}-${month}-${year}`;

  return format;
};

export const formatTime = (global__date) => {
  const timestamp = global__date.getTime();

  const date = new Date(parseInt(timestamp));

  const hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  const format = `${hour}:${minutes}`;

  return format;
};

export const formatDateTime = (global__date) => {
  const time = new Date(Date.parse(global__date));
  const localDate = time.toString();
  const split__localDate = localDate.substring(0, 3);
  const timestamp = time.getTime();
  const global__day = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const vietnames__day = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"];
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

  let index__day = 0;
  for (let index = 0; index < global__day.length; index++) {
    if (split__localDate === global__day[index]) {
      index__day = index;
    }
  }
  const date = new Date(parseInt(timestamp));
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minute = date.getMinutes();

  const format = `${hours}:${minute} ${vietnames__day[index__day]}, ${day} Tháng ${month}, ${year} `;

  return format;
};
