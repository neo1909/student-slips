package com.studentslips.services.impl;

import com.studentslips.common.*;
import com.studentslips.dao.BankStatementDao;
import com.studentslips.dao.BankStatementUploadHistoryDao;
import com.studentslips.dao.StudentsDao;
import com.studentslips.entities.BankStatement;
import com.studentslips.entities.BankStatementUploadHistory;
import com.studentslips.entities.Student;
import com.studentslips.services.PostingPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
import java.io.InputStream;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.ParseException;
import java.util.*;
import java.util.stream.Collectors;

@Service(value = "PostingPaymentService")
public class PostingPaymentServiceImpl implements PostingPaymentService {

    @Autowired
    BankStatementDao bankStatementDao;

    @Autowired
    BankStatementUploadHistoryDao bankStatementUploadHistoryDao;

    @Autowired
    StudentsDao studentsDao;

    @Override
    @Transactional
    public String saveUploadedFiles(List<MultipartFile> files) throws Exception {
        StringBuffer result = new StringBuffer();
        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                continue;
            }

            byte[] bytes = file.getBytes();
            //Path path = Paths.get(Common.UPLOADED_FOLDER + file.getOriginalFilename());
            //Files.write(path, bytes);
            if(!result.toString().isEmpty()){
                result.append(", ");
            }
            result.append(file.getOriginalFilename());

            //processConvertAndSave(file);
            processConvertAndSaveNotUpload(file);
        }
        return result.toString();
    }

    @Override
    public boolean validateBeforeUpload(List<MultipartFile> files) {

        List<String> filenames = files.stream().map(MultipartFile::getOriginalFilename).collect(Collectors.toList());

        List<BankStatement> bankStatements = bankStatementDao.selectUploadedBankStatement(filenames);

        return CollectionUtils.isEmpty(bankStatements);
    }

    @Deprecated
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
            //setStavka(bankStatement, doc);

        } catch (ParserConfigurationException | SAXException | IOException e) {
            e.printStackTrace();
        }

        bankStatement.setSchoolId(SessionUtil.getSchoolId());
        bankStatement.setFilename(file.getOriginalFilename());
        bankStatement.setInsertDate(new Timestamp(System.currentTimeMillis()));
        bankStatement.setInsertId(SessionUtil.getUserLoginId());

        bankStatementDao.insertBankStatement(bankStatement);

        logUploadHistory(bankStatement);

    }

    private void processConvertAndSaveNotUpload(MultipartFile file) throws Exception {

        String msg = "";

        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        try {
            InputStream is =  file.getInputStream();
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(is);

            NodeList stavkaList = doc.getElementsByTagName("Stavka");

            if(stavkaList == null){
                throw new Exception(msg);
            }

            for (int index = 0; index < stavkaList.getLength(); index++) {

                BankStatement bankStatement = new BankStatement();

                setZaglavlje(bankStatement, doc);
                setZbirni(bankStatement, doc);
                setStavka(bankStatement, doc, index);

                bankStatement.setSchoolId(SessionUtil.getSchoolId());
                bankStatement.setFilename(file.getOriginalFilename());
                bankStatement.setInsertDate(new Timestamp(System.currentTimeMillis()));
                bankStatement.setInsertId(SessionUtil.getUserLoginId());

                bankStatementDao.insertBankStatement(bankStatement);

                logUploadHistory(bankStatement);
            }
        } catch (ParserConfigurationException | SAXException | IOException e) {
            e.printStackTrace();
            throw e;
        }
    }

    private void logUploadHistory(BankStatement bankStatement) throws Exception {

        BankStatementUploadHistory bankStatementUploadHistory = new BankStatementUploadHistory();
        bankStatementUploadHistory.setSchoolId(SessionUtil.getSchoolId());
        bankStatementUploadHistory.setFilename(bankStatement.getFilename());
        bankStatementUploadHistory.setPath(Common.UPLOADED_FOLDER + bankStatement.getFilename());
        bankStatementUploadHistory.setUploadDate(new Timestamp(System.currentTimeMillis()));
        bankStatementUploadHistory.setInsertDate(new Timestamp(System.currentTimeMillis()));
        bankStatementUploadHistory.setInsertId(SessionUtil.getUserLoginId());
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
                String payee = element.getElementsByTagName("Naziv").item(0).getTextContent();

                int orderNoRequired = Integer.parseInt(element.getElementsByTagName("BrNalogaPotrazuje").item(0).getTextContent());
                int noAccountDebt = Integer.parseInt(element.getElementsByTagName("BrNalogaDuguje").item(0).getTextContent());

                BigDecimal amountRequired = CurrencyUtil.convertStringCommaToBigDecimal(element.getElementsByTagName("IznosPotrazuje").item(0).getTextContent());
                BigDecimal amountDue = CurrencyUtil.convertStringCommaToBigDecimal(element.getElementsByTagName("IznosDuguje").item(0).getTextContent());

                String noOfBankStatement = element.getElementsByTagName("BrojIzvoda").item(0).getTextContent();

                bankStatement.setPayeeAcount(accountNumber);
                bankStatement.setPayee(payee);
                bankStatement.setNoOfChanges(orderNoRequired + noAccountDebt);
                bankStatement.setBalance(amountRequired.subtract(amountDue));
                bankStatement.setNoOfBankStatement(Integer.parseInt(noOfBankStatement));
            }
        }
    }

    private void setStavka(BankStatement bankStatement, Document doc, int index) throws Exception {
        NodeList item = doc.getElementsByTagName("Stavka");

        Node node = item.item(index);

        if (node.getNodeType() == Node.ELEMENT_NODE) {

            Element element = (Element) node;

            String payerAcc = element.getElementsByTagName("RacunZaduzenja").item(0).getTextContent();
            String payer = element.getElementsByTagName("NazivZaduzenja").item(0).getTextContent();
            String claims = element.getElementsByTagName("Iznos").item(0).getTextContent();
            String referenceNo = element.getElementsByTagName("PozivOdobrenja").item(0).getTextContent();
            String purpose = element.getElementsByTagName("SvrhaDoznake").item(0).getTextContent();
            String currencyDate = element.getElementsByTagName("DatumValute").item(0).getTextContent();

            bankStatement.setPayerAccount(payerAcc);
            bankStatement.setPayer(payer);
            bankStatement.setClaims(CurrencyUtil.convertStringCommaToBigDecimal(claims));
            bankStatement.setReferenceNo(referenceNo);
            bankStatement.setPurpose(purpose);
            bankStatement.setCurrencyDate(DateUtil.converStringToTimeStamp(currencyDate));
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

        BankStatement bankStatement = new BankStatement();
        bankStatement.setPostPaymentYn(Common.VAL_N);

        List<BankStatement> bankStatements = bankStatementDao.selectAllBankStatement(bankStatement);

        Set<String> uploadedFile = new HashSet<>();

        if(!CollectionUtils.isEmpty(bankStatements)){
            for (BankStatement statement: bankStatements) {
                statement.setPostPaymentYn(Common.VAL_Y);
                bankStatementDao.updateBankStatement(statement); // TO DO

                logPostPaymentHistory(statement);

                uploadedFile.add(statement.getFilename());
            }
        }

        StringBuffer result = new StringBuffer();
        for (String fileNm : uploadedFile) {
            if(!result.toString().isEmpty()){
                result.append(", ");
            }
            result.append(fileNm);
        }

        return result.toString();
    }

    private void logPostPaymentHistory(BankStatement bankStatement) throws Exception {

        BankStatementUploadHistory bankStatementUploadHistory = new BankStatementUploadHistory();
        bankStatementUploadHistory.setFilename(bankStatement.getFilename());
        bankStatementUploadHistory.setPostPaymentDate(new Timestamp(System.currentTimeMillis()));
        bankStatementUploadHistory.setUpdateDate(new Timestamp(System.currentTimeMillis()));
        bankStatementUploadHistory.setUpdateId(SessionUtil.getUserLoginId());
        bankStatementUploadHistoryDao.updateBankStatementUploadHistory(bankStatementUploadHistory);
    }

}


