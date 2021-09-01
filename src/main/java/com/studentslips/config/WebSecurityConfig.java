package com.studentslips.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

import com.studentslips.security.CustomAuthenticationEntryPoint;
import com.studentslips.security.CustomAuthenticationFailureHandler;
import com.studentslips.security.CustomAuthenticationFilter;
import com.studentslips.security.CustomAuthenticationSuccessHandler;
import com.studentslips.security.CustomExceptionHandlerFilter;
import com.studentslips.security.CustomLogoutHandler;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Bean
	public CustomAuthenticationFilter customAuthenticationFilter() throws Exception {
		CustomAuthenticationFilter customAuthFilter = new CustomAuthenticationFilter(passwordEncoder());
		customAuthFilter.setFilterProcessesUrl("/authenticate");
		customAuthFilter.setAuthenticationManager(authenticationManager());
		customAuthFilter.setAuthenticationSuccessHandler(authenticationSuccessHandler());
		customAuthFilter.setAuthenticationFailureHandler(authenticationFailureHandler());
		return customAuthFilter;
	};
	
	@Bean
	public CustomExceptionHandlerFilter customExceptionHandlerFilter() {
		return new CustomExceptionHandlerFilter();
	}
	
	@Bean
	public CustomAuthenticationEntryPoint authenticationEntryPoint() {
		return new CustomAuthenticationEntryPoint("/login");
	}

	@Bean
	public CustomAuthenticationSuccessHandler authenticationSuccessHandler() throws Exception {
		return new CustomAuthenticationSuccessHandler();
	};
	
	@Bean
	public CustomAuthenticationFailureHandler authenticationFailureHandler() throws Exception {
		return new CustomAuthenticationFailureHandler();
	};
	
	@Bean
	public AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public CustomLogoutHandler logoutHandler() {
		return new CustomLogoutHandler();
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		/**
		 * @Session
		 * 
		 * */
		http.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
			.invalidSessionUrl("/login")
			.sessionAuthenticationErrorUrl("/login")
			.maximumSessions(1);

		/**
		 * @Authorization
		 * 
		 * */
		http.cors().and().csrf().disable()
			.authorizeRequests()
			.antMatchers("/api/SC_R_03").permitAll()
			.antMatchers("/api/A_**").permitAll()
			.antMatchers("/api/**").authenticated()
			.antMatchers("/index**").authenticated()
			.antMatchers("/admin/**").hasAnyRole("ADMIN")
			.antMatchers("/data-entry/**").authenticated()
			.antMatchers("/posting/**").authenticated()
			.antMatchers("/overview/**").authenticated()
			.antMatchers("/archive/**").authenticated()
			.anyRequest().permitAll();
		

		/**
		 * @Logout
		 * 
		 * */
		http.logout()
			.logoutUrl("/logout")
			.addLogoutHandler(logoutHandler())
			.clearAuthentication(true)
			.logoutSuccessUrl("/login")
	        .deleteCookies("JSESSIONID")
	        .invalidateHttpSession(true)
	        .permitAll();

		/**
		 * @Others
		 * 
		 * */
		http.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint());
		http.exceptionHandling().accessDeniedPage("/error/404.html");

		/**
		 * @Filters
		 * 
		 * */
		http.addFilterBefore(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
		http.addFilterBefore(customExceptionHandlerFilter(), CorsFilter.class);
	}
}