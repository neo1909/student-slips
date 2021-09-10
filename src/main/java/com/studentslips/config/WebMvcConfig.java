package com.studentslips.config;

import java.util.Locale;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

	@Bean(name = "localeResolver")
	public LocaleResolver getLocaleResolver() {
		SessionLocaleResolver slr = new SessionLocaleResolver();
		slr.setDefaultLocale(new Locale("sr", "RS"));
		return slr;
	}

	@Bean(name = "messageSource")
	public MessageSource getMessageResource() {
		ReloadableResourceBundleMessageSource messageResource = new ReloadableResourceBundleMessageSource();
		messageResource.setBasename("classpath:i18n/messages");
		messageResource.setDefaultEncoding("UTF-8");
		return messageResource;
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		LocaleChangeInterceptor lci = new LocaleChangeInterceptor();
		lci.setParamName("lang");
		registry.addInterceptor(lci);
	}
	
	@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Objects.requireNonNull(registry);
        
        registry.addResourceHandler("/**/lib/images/**", "/**/lib/styles/**")
                .addResourceLocations("classpath:/static/")
                .setCacheControl(CacheControl.maxAge(3, TimeUnit.DAYS));
        
        registry.addResourceHandler("/**/lib/scripts/*.js")
		        .addResourceLocations("classpath:/static/")
		        .setCacheControl(CacheControl.maxAge(3, TimeUnit.DAYS));
    }
}
