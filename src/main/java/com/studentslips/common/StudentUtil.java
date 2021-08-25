package com.studentslips.common;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class StudentUtil {

    // Domain
    //1 = student id
    //2 = supplier id
    //3 = service id
    public static String getIdFromRefNo(String refNo, String domain){
        if(Common.STUDENT_ID.equals(domain)){
            return refNo.split("-")[0];
        }

        if(Common.SUPPLIER_ID.equals(domain)){
            return refNo.split("-")[1];
        }

        if(Common.SERVICE_ID.equals(domain)){
            return refNo.split("-")[2];
        }
        return null;
    }
}

