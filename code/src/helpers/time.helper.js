import moment from "moment-timezone";

class TimeHelper {
  static TIMEZONE = "Asia/Karachi";

  static now = (format = "YYYY-MM-DD HH:mm:ss") => {
    return moment().tz(this.TIMEZONE).format(format);
  };
}

export default TimeHelper;
