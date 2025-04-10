import StarIcon from "@material-ui/icons/Star";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import StarHalfOutlined from "@material-ui/icons/StarHalfOutlined";

export const filterCaseInsensitive = (filter, row) => {
  const id = filter.pivotId || filter.id;
  const content = row[id];
  if (typeof content !== 'undefined') {
    // filter by text in the table or if it's a object, filter by key
    if (typeof content === 'object' && content !== null && content.key) {
      return String(content.key).toLowerCase().includes(filter.value.toLowerCase());
    } else {
      return String(content).toLowerCase().includes(filter.value.toLowerCase());
    }
  }

  return true;
};

export const getStars = (value) => {
  let stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < value) {
      if(i + 0.5 >= value) stars.push(<StarHalfOutlined key={i} /> )
      else stars.push(<StarIcon key={i} />);
    } else {
      stars.push(<StarBorderOutlinedIcon key={i} />);
    }
  }
  return stars;
};
