package com.studentslips.common;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {

    public static Timestamp converStringToTimeStamp(String dateStr) throws ParseException {
        SimpleDateFormat datetimeFormatter1 = new SimpleDateFormat(
                "MM.dd.yyyy");
        Date date = datetimeFormatter1.parse(dateStr);

        return new Timestamp(date.getTime());
    }
}
