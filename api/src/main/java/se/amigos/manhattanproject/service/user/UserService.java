package se.amigos.manhattanproject.service.user;

import se.amigos.manhattanproject.domain.user.User;

/**
 * Service to handle Users
 * 
 * @author fidde
 *
 */
public interface UserService {

    /**
     * Gets user by id
     * 
     * @param id
     *            user id
     * @return {@link User}
     */
    User getUser(String id);

    /**
     * Removes user by id
     * 
     * @param id
     *            user id
     */
    void removeUser(String id);

    /**
     * Adds user
     * 
     * @param user
     * @return {@link User}
     */
    User addUser(User user);

    /**
     * Drops all users from collection
     */
    void dropAllUsers();

    /**
     * Gets user by name
     * 
     * @param username
     * @return {@link User}
     */
    User getUserByName(String username);

    /**
     * Gets user by name and password
     * 
     * @param username
     * @param password
     * @return {@link User}
     */
    User getUserByNameAndPassword(String username, String password);
}
