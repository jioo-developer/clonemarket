// 3자리 마다 콤마 찍는 함수
const convertPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default convertPrice;
