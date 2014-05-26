package se.amigos.manhattanproject.service.user;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import se.amigos.manhattanproject.domain.user.User;
import se.amigos.manhattanproject.repo.UserRepo;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceTest {

    private static final String BAR = "bar";

    private static final String FOO = "foo";

    @Mock
    private UserRepo repo;

    @InjectMocks
    private UserService service = new UserServiceImpl();
    private String id = "0";
    private User user;

    @Test
    public void testGetService() {
        assertNotNull("can get service", service);
    }

    @Test
    public void testGetUser() throws Exception {
        service.getUser(id);
        Mockito.verify(repo).findOne(id);
    }

    @Test
    public void testRemoveUser() throws Exception {
        service.removeUser(id);
        Mockito.verify(repo).delete(id);
    }

    @Test
    public void testAddUser() throws Exception {
        service.addUser(user);
        Mockito.verify(repo).save(user);
    }

    @Test
    public void testDropAllUsers() throws Exception {
        service.dropAllUsers();
        Mockito.verify(repo).deleteAll();
    }

    @Test
    public void testGetUserByName() throws Exception {
        service.getUserByName(FOO);
        Mockito.verify(repo).findByName(FOO);
    }

    @Test
    public void testGetUserByNameAndPassword() throws Exception {
        service.getUserByNameAndPassword(FOO, BAR);
        Mockito.verify(repo).findByNameAndPassword(FOO, BAR);
    }
}
