package com.bgbusiness.service;

public class SecurityConstants {

    public static final String SIGN_UP_URLS = "/**/**";
    public static final String SECRET = "SecretKeyToGenerateJWT";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 30_000; //30 seconds it's in miliseconds


}
