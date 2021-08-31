package com.studentslips.common;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {

    public static Timestamp convertStringToTimeStamp(String dateStr) throws ParseException {
        SimpleDateFormat datetimeFormatter1 = new SimpleDateFormat(
                Common.DATE_FORMAT_DOT_DD_MM_YYYY);
        Date date = datetimeFormatter1.parse(dateStr);

        return new Timestamp(date.getTime());
    }

    public static java.sql.Date convertStringToDate(String dateStr) throws ParseException {
        SimpleDateFormat datetimeFormatter1 = new SimpleDateFormat(
                Common.DATE_FORMAT_DOT_DD_MM_YYYY);
        return new java.sql.Date(datetimeFormatter1.parse(dateStr).getTime());
    }
}
