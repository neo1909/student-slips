package com.studentslips.common;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class CurrencyUtil {

    public static BigDecimal convertStringCommaToBigDecimal(String balanceStr) throws Exception {

        // Standard French locale has ',' (comma) for decimal separator
        NumberFormat nf = NumberFormat.getInstance(Locale.FRANCE);
        Number balanceNumber = nf.parse(balanceStr);
        double balanceD = balanceNumber.doubleValue();

        return BigDecimal.valueOf(balanceD);
    }
}
