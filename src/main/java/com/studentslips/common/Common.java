package com.studentslips.common;

public class Common {
    public static final String STATUS = "status";
    public static final String LIST = "lst";
    public static final String OBJECT = "obj";
    public static final String MESSAGE = "msg";

    //Save the uploaded file to this folder
    public static final String UPLOADED_FOLDER = "aws:elasticbeanstalk:application:environment:UPLOADED_FOLDER:/usr/local/";

    public static final String VAL_Y = "Y";
    public static final String VAL_N = "N";

    public static final String STUDENT_ID = "studentId";
    public static final String SUPPLIER_ID = "supplierId";
    public static final String SERVICE_ID = "serviceId";

    public static final String DATE_FORMAT_DOT_DD_MM_YYYY = "dd.MM.yyyy";
    
    public class Message {
    	public static final String CONTACT_ADMIN = "lang.msg.contactAdmin";
    	public static final String USER_NOT_EXIST = "lang.msg.userNotExist";
    	public static final String TOO_MANY_TRY = "lang.msg.tooManyTry";
    	public static final String PLS_PROCEED_AFTER = "lang.msg.plsProceedAfter";
		public static final String LOCKED_ACCOUNT = "lang.msg.lockedAccount";
		public static final String VERIFY_AUTH_NG = "lang.msg.verifyAuthNg";
		public static final String INCORRECT_PWD = "lang.msg.incorrectPassword";
		public static final String INCORRECT_EMAIL = "lang.msg.incorrectEmail";
		public static final String RESET_PWD_OK = "lang.msg.passwordResetOk";
		public static final String RESET_PWD_NG = "lang.msg.passwordResetNg";
		public static final String REGISTER_OK = "lang.msg.registerOk";
		public static final String POSTING_PLS_SELECT_FILE = "lang.msg.plsSelectFile";
		public static final String POSTING_EXISTED_BANK_STATEMENT = "lang.msg.existedBankStatement";
		public static final String POSTING_UPLOAD_BS_OK = "lang.msg.uploadBankStatementOk";
		public static final String POSTING_SAVE_BS_OK = "lang.msg.saveBankStatementOk";

		public static final String DATAENTRY_EXISTED_SCHOOL = "lang.msg.existedSchool";
		public static final String DATAENTRY_SAVE_SCHOOL_OK = "lang.msg.saveSchoolOk";
		public static final String DATAENTRY_SAVE_SCHOOL_NG = "lang.msg.saveSchoolNg";
		public static final String NO_PERMISSION = "lang.msg.noPermission";
		
    }
}
