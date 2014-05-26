package se.amigos.manhattanproject.domain.user;

import static org.junit.Assert.assertNotNull;

import java.util.Set;

import org.junit.Before;
import org.junit.Test;

import se.amigos.manhattanproject.domain.backlog.Backlog;

public class UserTest {

    private User user;

    @Before
    public void setUp() throws Exception {
        user = new User("foo", "bar");
    }

    @Test
    public void testGetUser() {
        assertNotNull("can get user", user);
    }

    @Test
    public void testGetName() throws Exception {
        String name = user.getName();
        assertNotNull("can get name", name);
    }

    @Test
    public void testGetPassword() throws Exception {
        String password = user.getPassword();
        assertNotNull("can get pass", password);
    }

    @Test
    public void testGetBacklogs() throws Exception {
        Set<Backlog> backlogs = user.getBacklogs();
        assertNotNull("can get ids", backlogs);
    }

}
