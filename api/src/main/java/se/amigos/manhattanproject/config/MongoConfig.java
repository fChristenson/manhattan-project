package se.amigos.manhattanproject.config;

import java.io.IOException;
import java.util.Properties;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;

/**
 * Spring config class for mongo
 * 
 * @author fidde
 *
 */
@Configuration
@EnableMongoRepositories
public class MongoConfig extends AbstractMongoConfiguration {

    private String dbName;
    private String dbUrl;

    /**
     * Constructor
     * 
     * @throws IOException
     */
    public MongoConfig() throws IOException {
        Properties properties = new Properties();
        properties.load(getClass().getResourceAsStream(
                "/application.properties"));

        dbName = properties.getProperty("db.name");
        dbUrl = properties.getProperty("db.url");
    }

    /**
     * Constructor
     * 
     * @param name
     *            db.name
     * @param url
     *            db.url
     */
    public MongoConfig(String name, String url) {
        dbName = name;
        dbUrl = url;
    }

    @Override
    protected String getDatabaseName() {
        return dbName;
    }

    @Override
    public Mongo mongo() throws Exception {
        return new MongoClient(dbUrl);
    }
}
