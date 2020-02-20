package com.bgbusiness.security;

import com.bgbusiness.model.User;
import com.bgbusiness.service.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

import static com.bgbusiness.service.SecurityConstants.HEADER_STRING;
import static com.bgbusiness.service.SecurityConstants.TOKEN_PREFIX;

public class JWTAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    JwtTokenProvider tokenProvider;

    @Autowired
    private CustomUserDetailService userDetailService;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        try {
            String jwt = getJWTFromRequest(httpServletRequest);
            if(StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                Long userID = tokenProvider.getUserIdFromJWT(jwt);
                User userDetails = userDetailService.loadUserById(userID);

                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, Collections.emptyList());
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }catch (Exception ex) {
            logger.error("Could not set user authentication in secutiry context", ex);
        }


        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }


    private String getJWTFromRequest(HttpServletRequest request) {
        String bearerToekn = request.getHeader(HEADER_STRING);

        if(StringUtils.hasText(bearerToekn)&&bearerToekn.startsWith(TOKEN_PREFIX)) {
            return bearerToekn.substring(7, bearerToekn.length());
        }
        return null;
    }
}
