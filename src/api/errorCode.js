export function errorCode(code) {
  switch (code) {
    case 200:
      return true;
    /* 登录与注册部分： 4** */
    case 401:
      console.log("ERROR: The username has been taken!");
      break;
    case 410:
      console.log("ERROR: Username does not exist!");
      break;
    case 411:
      console.log("ERROR: Password error!");
      break;
    case 412:
      console.log("ERROR: Account is frozen!");
      break;
    default:
      console.log("ERROR: Unknown error!");
  }
  return false;
}
