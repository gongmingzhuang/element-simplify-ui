export default {
  /**
   * [20201223] 金额格式化
   * @param number 要格式化的数字
   * @param decimals 保留几位小数
   * @returns {string}
   */
  format: function(number, decimals){
    var  number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = ',' ,
      dec =  '.',
      s = '',vs='',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' +(n * k) / k;
    };

    s = (prec ? toFixedFix(n, prec) : '' + (n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, "$1" + sep + "$2");
    };

    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    };
    // alert('s=='+s+'===dec=='+dec);
    //var  vs=s.toString().substring(0,s.length-1);
    // alert(vs);
    return s.join(dec);
  },
  /**
   * [20201218] 金额格式化-将格式化金额转化为数字类型
   * @param numberStr
   * @returns {string|number}
   */
  reverse: function(numberStr){
    var _number = numberStr.replace(new RegExp(/,/g),'');
    if(isNaN(_number)){
      return "0.00"
    }
    return +_number;
  },
  /**
   * [20210127] 数字金额大写转换(可以处理整数,小数,负数)
   * @param number
   */
  capitalize: function(currencyDigits){
    var MAXIMUM_NUMBER = 9999999999999.99; //16w
    // Predefine the radix characters and currency symbols for output:
    var CN_ZERO = "零";
    var CN_ONE = "壹";
    var CN_TWO = "贰";
    var CN_THREE = "叁";
    var CN_FOUR = "肆";
    var CN_FIVE = "伍";
    var CN_SIX = "陆";
    var CN_SEVEN = "柒";
    var CN_EIGHT = "捌";
    var CN_NINE = "玖";
    var CN_TEN = "拾";
    var CN_HUNDRED = "佰";
    var CN_THOUSAND = "仟";
    var CN_TEN_THOUSAND = "万";
    var CN_HUNDRED_MILLION = "亿";
    var CN_SYMBOL = "";
    var CN_DOLLAR = "元";
    var CN_TEN_CENT = "角";
    var CN_CENT = "分";
    var CN_INTEGER = "整";

// Variables:
    var integral;    // Represent integral part of digit number.
    var decimal;    // Represent decimal part of digit number.
    var outputCharacters;    // The output result.
    var parts;
    var digits, radices, bigRadices, decimals;
    var zeroCount;
    var i, p, d,ds;
    var quotient, modulus;

// Validate input string:
    // 8.11 添加0过滤
    if(currencyDigits || !isNaN(currencyDigits) && currencyDigits == 0){
      currencyDigits = currencyDigits.toString();
    };


    /*    if (currencyDigits.match(/[^,.\d]/) != null) {
                  alert("输入字符串中的字符无效!");
                  return "";
              }
              if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
                  alert("请输入正确的数字金额!");
                  return "";
              }*/

// Normalize the format of input digits:
    currencyDigits = currencyDigits ? currencyDigits.replace(/,/g, "") : "";    // Remove comma delimiters.
    currencyDigits = currencyDigits ? currencyDigits.replace(/^0+/, "") : "";    // Trim zeros at the beginning.
    // Assert the number is not greater than the maximum number.
    if (Number(currencyDigits) > MAXIMUM_NUMBER) {
      alert("数字太大啦..");
      return "";
    }

// Process the coversion from currency digits to characters:
    // Separate integral and decimal parts before processing coversion:
    parts = currencyDigits.split(".");
    if (parts.length > 1) {
      integral = parts[0];
      decimal = parts[1];
      // Cut down redundant decimal digits that are after the second.
      decimal = decimal.substr(0, 2);
    }
    else {
      integral = parts[0];
      decimal = "";
    }
    // Prepare the characters corresponding to the digits:
    digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE);
    radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
    bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
    decimals = new Array(CN_TEN_CENT, CN_CENT);
    // Start processing:
    outputCharacters = "";
    // Process integral part if it is larger than 0:
    if (Number(integral) > 0) {
      zeroCount = 0;
      for (i = 0; i < integral.length; i++) {
        p = integral.length - i - 1;
        d = integral.substr(i, 1);
        quotient = p / 4;
        modulus = p % 4;
        if (d == "0") {
          zeroCount++;
        }
        else {
          if (zeroCount > 0)
          {
            outputCharacters += digits[0];
          }
          zeroCount = 0;
          outputCharacters += digits[Number(d)] + radices[modulus];
        }
        if (modulus == 0 && zeroCount < 4) {
          outputCharacters += bigRadices[quotient];
        }
      }
      outputCharacters += CN_DOLLAR;
    }
    // Process decimal part if there is:
    if (decimal != "") {
      for (i = 0; i < decimal.length; i++) {
        d = decimal.substr(i, 1);
        ds=decimal.substr(-1, 1);
        if(d==0){
          if(ds==0){
            outputCharacters += "";
          }
          else{
            outputCharacters += digits[Number(d)];
          }
        }
        else{

          outputCharacters += digits[Number(d)] + decimals[i];

        }
      }
    }
    // Confirm and return the final output string:
    if (outputCharacters == "") {
      outputCharacters = CN_ZERO + CN_DOLLAR;
    }
    if (decimal == "") {
      outputCharacters += CN_INTEGER;
    }
    outputCharacters = CN_SYMBOL + outputCharacters;
    return outputCharacters;
  },
  /**
   *
   * @param min(不可取)
   * @param max（可取）
   */
  rangeRandomNumber: function(min, max){
    var _min = min || 0, _max = max || 1, _num = 0;
    _num = Math.ceil(Math.random()*(_max-_min) + _min)
    return _num
  }
}