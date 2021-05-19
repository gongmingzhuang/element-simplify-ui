export default {
  moneyFormat: function (number, decimals) {
    decimals = decimals || 2;
    var number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = ',', // 千位逗号
      dec = '.',
      s = '',
      vs = '';
    var toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + (n * k) / k;
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
    return s.join(dec);
  } 
}