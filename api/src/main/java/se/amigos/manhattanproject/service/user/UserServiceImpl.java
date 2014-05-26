package se.amigos.manhattanproject.service.user;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import se.amigos.manhattanproject.domain.backlog.Backlog;
import se.amigos.manhattanproject.domain.user.User;
import se.amigos.manhattanproject.repo.UserRepo;

/**
 * Implementation of {@link UserService}
 * 
 * @author fidde
 *
 **/
@Service
public class UserServiceImpl implements UserService {

    private Logger log = Logger.getLogger(UserServiceImpl.class);
    private UserRepo repo;

    /**
     * Default constructor
     */
    public UserServiceImpl() {
        log.debug("UserServiceImpl created");
    }

    /**
     * Constructor
     * 
     * @param repo
     *            {@link UserRepo}
     */
    @Autowired
    public UserServiceImpl(UserRepo repo) {
        super();
        this.repo = repo;
        log.debug("UserServiceImpl created");
    }

    public User getUser(String id) {
        log.debug("get: " + id);
        User user = repo.findOne(id);

        log.debug("found: " + user);
        return user;
    }

    public void removeUser(String id) {
        log.debug("remove: " + id);
        repo.delete(id);
    }

    /**
     * Adding a user with no backlog will add a default backlog
     */
    public User addUser(User user) {

        // all users must have at least 1 backlog
        if (user != null && user.getBacklogs().size() < 1) {
            Backlog backlog = new Backlog();

            String name = "My backlog";
            backlog.setName(name);
            log.debug("setting backlog name to: " + name);

            user.getBacklogs().add(backlog);
        }

        log.debug("add: " + user);
        return repo.save(user);
    }

    public void dropAllUsers() {
        repo.deleteAll();
        log.debug("removed all users");
    }

    public User getUserByName(String username) {
        User result = repo.findByName(username);

        log.debug("get: " + result);
        return result;
    }

    public User getUserByNameAndPassword(String username, String password) {
        User result = repo.findByNameAndPassword(username, password);

        log.debug("get: " + result);
        return result;
    }

}
