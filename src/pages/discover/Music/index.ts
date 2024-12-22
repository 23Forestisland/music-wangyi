
// 处理数字展示亿/万单位
export const formatNumber = (num: number): string | number => {
    let formattedNum;

    if (num >= 100000000) {
      //大于等于1亿时，转换为“亿”为单位，保留一位小数
      formattedNum = (num / 100000000).toFixed(1) + '亿';
    } else if (num >= 10000) {
      // 大于等于1万，小于等于1亿时，转换为“万”为单位，保留一位小数
      formattedNum = (num / 10000).toFixed(1) + '万';
    } else if (num >= 1000) {
      // 大于等于1千，小于1万时，直接显示
      formattedNum = (num / 1000);
    } else {
      // 小于1千，直接显示
      formattedNum = num;
    }

    return formattedNum;
  };