package se.amigos.manhattanproject.repo;

import static org.junit.Assert.assertNotNull;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import se.amigos.manhattanproject.ApiApplication;
import se.amigos.manhattanproject.config.MongoConfig;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { ApiApplication.class, MongoConfig.class })
public class DatabaseConfigTest {

    private static final String url = "localhost";
    private static final String name = "test";
    private MongoConfig mongoConfig;

    @Before
    public void setUp() throws Exception {
        mongoConfig = new MongoConfig(name, url);
    }

    @Test
    public void testGetMongoConfig() {
        assertNotNull("can get config", mongoConfig);
    }

}
