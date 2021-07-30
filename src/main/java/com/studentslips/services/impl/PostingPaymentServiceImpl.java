package com.studentslips.services.impl;

import com.studentslips.common.Common;
import com.studentslips.common.CurrencyUtil;
import com.studentslips.common.DateUtil;
import com.studentslips.dao.BankStatementDao;
import com.studentslips.entities.BankStatement;
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
import java.util.List;
import java.util.stream.Collectors;

@Service(value = "PostingPaymentService")
public class PostingPaymentServiceImpl implements PostingPaymentService {

    @Autowired
    BankStatementDao bankStatementDao;

    @Override
    public void saveUploadedFiles(List<MultipartFile> files) throws Exception {
        validateBeforeUpload(files);

        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                continue;
            }

            byte[] bytes = file.getBytes();
            Path path = Paths.get(Common.UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);

            processConvertAndSave(file);
        }
    }

    private void validateBeforeUpload(List<MultipartFile> files) throws Exception {

        List<String> filenames = files.stream().map(MultipartFile::getOriginalFilename).collect(Collectors.toList());

        List<BankStatement> bankStatements = bankStatementDao.selectUploadedBankStatement(filenames);

        if (!CollectionUtils.isEmpty(bankStatements)) {
            throw new Exception();
        }
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

        bankStatement.setFilename(file.getOriginalFilename());
        bankStatement.setInsertDate(new Timestamp(System.currentTimeMillis()));
        bankStatement.setInsertId(100);

        bankStatementDao.insertBankStatement(bankStatement);

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

                String noOfChanges = element.getElementsByTagName("BrNalogaPotrazuje").item(0).getTextContent();
                String balance = element.getElementsByTagName("IznosPotrazuje").item(0).getTextContent();
                String noOfBankStatement = element.getElementsByTagName("BrojIzvoda").item(0).getTextContent();

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
                String currencyDate = element.getElementsByTagName("DatumValute").item(0).getTextContent();

                bankStatement.setClaims(CurrencyUtil.convertStringCommaToBigDecimal(claims));
                bankStatement.setReferenceNo(referenceNo);
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
    public void saveAndPostPayment() throws Exception {
        BankStatement bankStatement = new BankStatement();
        bankStatement.setPostPaymentYn(Common.VAL_N);
        List<BankStatement> bankStatements = bankStatementDao.selectAllBankStatement(bankStatement);

        if(!CollectionUtils.isEmpty(bankStatements)){
            for (BankStatement statement: bankStatements) {
                statement.setPostPaymentYn(Common.VAL_Y);
                bankStatementDao.updateBankStatement(statement); // TO DO
            }
        }
    }


}


