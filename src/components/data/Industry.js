import { ApiGet } from "../../helpers/API/ApiData";

const data = async () => {
  const array = []
  const response = await ApiGet('industry/')
  response && response?.data?.data.map(item => array.push({ value: item.name, Industry_Name: item.name }))
  return array
}

export const Industry = async () => {
  return {
    industries: await data(),
    gender: [
      { value: "Male", Gender: "Male" },
      { value: "Female", Gender: "Female" },
      { value: "Other", Gender: "Other" },
    ],
  }
};

export default Industry;