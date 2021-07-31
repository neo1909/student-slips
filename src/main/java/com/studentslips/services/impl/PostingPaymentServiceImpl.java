package com.studentslips.services.impl;

import com.studentslips.common.Common;
import com.studentslips.common.CurrencyUtil;
import com.studentslips.common.DateUtil;
import com.studentslips.dao.BankStatementDao;
import com.studentslips.dao.BankStatementUploadHistoryDao;
import com.studentslips.entities.BankStatement;
import com.studentslips.entities.BankStatementUploadHistory;
import com.studentslips.services.PostingPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.XMLConstants;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service(value = "PostingPaymentService")
public class PostingPaymentServiceImpl implements PostingPaymentService {

    @Autowired
    BankStatementDao bankStatementDao;

    @Autowired
    BankStatementUploadHistoryDao bankStatementUploadHistoryDao;

    @Override
    public String saveUploadedFiles(List<MultipartFile> files) throws Exception {
        StringBuffer result = new StringBuffer();
        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                continue;
            }

            byte[] bytes = file.getBytes();
            Path path = Paths.get(Common.UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);
            if(!result.toString().isEmpty()){
                result.append(", ");
            }
            result.append(file.getOriginalFilename());

            processConvertAndSave(file);
        }
        return result.toString();
    }

    @Override
    public boolean validateBeforeUpload(List<MultipartFile> files) {

        List<String> filenames = files.stream().map(MultipartFile::getOriginalFilename).collect(Collectors.toList());

        List<BankStatement> bankStatements = bankStatementDao.selectUploadedBankStatement(filenames);

        return CollectionUtils.isEmpty(bankStatements);
    }

    private void processConvertAndSave(MultipartFile file) throws Exception {
        BankStatement bankStatement = new BankStatement();

        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        try {
            // process XML securely, avoid attacks like XML External Entities (XXE)
            dbf.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);

            // parse XML file
            DocumentBuilder db = dbf.newDocumentBuilder();

            Document doc = db.parse(new File(Common.UPLOADED_FOLDER + file.getOriginalFilename()));

            doc.getDocumentElement().normalize();
            //String rootElement = doc.getDocumentElement().getNodeName()

            setZaglavlje(bankStatement, doc);
            setZbirni(bankStatement, doc);
            setStavka(bankStatement, doc);

        } catch (ParserConfigurationException | SAXException | IOException e) {
            e.printStackTrace();
        }

        bankStatement.setSchoolId(1);
        bankStatement.setFilename(file.getOriginalFilename());
        bankStatement.setInsertDate(new Timestamp(System.currentTimeMillis()));
        bankStatement.setInsertId(100);

        bankStatementDao.insertBankStatement(bankStatement);

        logUploadHistory(bankStatement);

    }

    private void logUploadHistory(BankStatement bankStatement) {

        BankStatementUploadHistory bankStatementUploadHistory = new BankStatementUploadHistory();
        bankStatementUploadHistory.setSchoolId(1);
        bankStatementUploadHistory.setFilename(bankStatement.getFilename());
        bankStatementUploadHistory.setPath(Common.UPLOADED_FOLDER + bankStatement.getFilename());
        bankStatementUploadHistory.setUploadDate(new Timestamp(System.currentTimeMillis()));
        bankStatementUploadHistory.setInsertDate(new Timestamp(System.currentTimeMillis()));
        bankStatementUploadHistory.setInsertId(100);
        bankStatementUploadHistoryDao.insertBankStatementUploadHistory(bankStatementUploadHistory);
    }

    private void setZaglavlje(BankStatement bankStatement, Document doc) throws ParseException {
        NodeList header = doc.getElementsByTagName("Zaglavlje");

        for (int temp = 0; temp < header.getLength(); temp++) {

            Node node = header.item(temp);

            if (node.getNodeType() == Node.ELEMENT_NODE) {

                Element element = (Element) node;

                //String id = element.getAttribute("id");

                String bankStatementDate = element.getElementsByTagName("DatumIzvoda").item(0).getTextContent();
                bankStatement.setBankStatementDate(DateUtil.converStringToTimeStamp(bankStatementDate));
            }
        }
    }

    private void setZbirni(BankStatement bankStatement, Document doc) throws Exception {
        NodeList collective = doc.getElementsByTagName("Zbirni");
        for (int temp = 0; temp < collective.getLength(); temp++) {

            Node node = collective.item(temp);

            if (node.getNodeType() == Node.ELEMENT_NODE) {

                Element element = (Element) node;

                String accountNumber = element.getElementsByTagName("RacunIzvoda").item(0).getTextContent();
                String payer = element.getElementsByTagName("Naziv").item(0).getTextContent();
                String noOfChanges = element.getElementsByTagName("BrNalogaPotrazuje").item(0).getTextContent();
                String balance = element.getElementsByTagName("IznosPotrazuje").item(0).getTextContent();
                String noOfBankStatement = element.getElementsByTagName("BrojIzvoda").item(0).getTextContent();

                bankStatement.setAccountNumber(accountNumber);
                bankStatement.setPayer(payer);
                bankStatement.setNoOfChanges(Integer.parseInt(noOfChanges));
                bankStatement.setBalance(CurrencyUtil.convertStringCommaToBigDecimal(balance));
                bankStatement.setNoOfBankStatement(Integer.parseInt(noOfBankStatement));
            }
        }
    }

    private void setStavka(BankStatement bankStatement, Document doc) throws Exception {
        NodeList item = doc.getElementsByTagName("Stavka");
        for (int temp = 0; temp < item.getLength(); temp++) {

            Node node = item.item(temp);

            if (node.getNodeType() == Node.ELEMENT_NODE) {

                Element element = (Element) node;

                String claims = element.getElementsByTagName("Iznos").item(0).getTextContent();
                String referenceNo = element.getElementsByTagName("PozivOdobrenja").item(0).getTextContent();
                String purpose = element.getElementsByTagName("SvrhaDoznake").item(0).getTextContent();
                String currencyDate = element.getElementsByTagName("DatumValute").item(0).getTextContent();

                bankStatement.setClaims(CurrencyUtil.convertStringCommaToBigDecimal(claims));
                bankStatement.setReferenceNo(referenceNo);
                bankStatement.setPurpose(purpose);
                bankStatement.setCurrencyDate(DateUtil.converStringToTimeStamp(currencyDate));
            }
        }
    }

    @Override
    public boolean isNotPostStatement() throws Exception {
        BankStatement bankStatement = new BankStatement();
        bankStatement.setPostPaymentYn(Common.VAL_N);
        return !CollectionUtils.isEmpty(bankStatementDao.selectAllBankStatement(bankStatement));
    }

    @Override
    public String saveAndPostPayment() throws Exception {
        StringBuffer result = new StringBuffer();
        BankStatement bankStatement = new BankStatement();
        bankStatement.setPostPaymentYn(Common.VAL_N);
        List<BankStatement> bankStatements = bankStatementDao.selectAllBankStatement(bankStatement);

        if(!CollectionUtils.isEmpty(bankStatements)){
            for (BankStatement statement: bankStatements) {
                statement.setPostPaymentYn(Common.VAL_Y);
                bankStatementDao.updateBankStatement(statement); // TO DO

                logPostPaymentHistory(statement);

                if(!result.toString().isEmpty()){
                    result.append(", ");
                }
                result.append(statement.getFilename());
            }
        }

        return result.toString();
    }

    private void logPostPaymentHistory(BankStatement bankStatement) {

        BankStatementUploadHistory bankStatementUploadHistory = new BankStatementUploadHistory();
        bankStatementUploadHistory.setFilename(bankStatement.getFilename());
        bankStatementUploadHistory.setPostPaymentDate(new Timestamp(System.currentTimeMillis()));
        bankStatementUploadHistory.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        bankStatementUploadHistory.setUpdateId(100);
        bankStatementUploadHistoryDao.updateBankStatementUploadHistory(bankStatementUploadHistory);
    }

}


