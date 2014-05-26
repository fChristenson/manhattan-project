package se.amigos.manhattanproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

/**
 * Application entrypoint
 * 
 * @author fidde
 *
 */
@EnableAutoConfiguration
@ComponentScan
public class ApiApplication {

    /**
     * Main method
     * 
     * @param args
     */
    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }

}