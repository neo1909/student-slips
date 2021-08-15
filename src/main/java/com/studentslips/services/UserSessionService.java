package com.studentslips.services;

import com.studentslips.entities.UserSession;

public interface UserSessionService {
    public int countUserSession(UserSession userSession);
    public UserSession selectUserSession(UserSession userSession);
    public int insertUserSession(UserSession userSession);
    public int deleteUserSession(UserSession userSession);
}
