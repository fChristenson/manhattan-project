package se.amigos.manhattanproject.controller.user;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.ResourceSupport;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import se.amigos.manhattanproject.domain.user.User;
import se.amigos.manhattanproject.domain.user.UserResource;
import se.amigos.manhattanproject.domain.user.UserResourceAssembler;
import se.amigos.manhattanproject.exceptions.ErrorInfo;
import se.amigos.manhattanproject.service.user.UserService;
import se.amigos.manhattanproject.util.LoggingUtil;
import se.amigos.manhattanproject.util.TokenUtil;
import se.amigos.manhattanproject.util.ValidationUtil;

import com.fasterxml.jackson.core.JsonProcessingException;

/**
 * REST controller for Users
 * 
 * @author fidde
 *
 */
@RestController
@RequestMapping("/users")
public class UserController {

    public static final String USERS = "/users";
    public static final String AUTH = "/auth";
    private static final String USER_NOT_FOUND = "User not found";

    private Logger log = Logger.getLogger(UserController.class);
    private UserService userService;

    /**
     * Constructor
     * 
     * @param service
     *            {@link UserService}
     */
    @Autowired
    public UserController(UserService service) {
        super();
        this.userService = service;
        log.debug("UserController created");
    }

    /**
     * Creates hypermedia links for users controller usage
     * 
     * @return {@link ResourceSupport} with links to methods on
     *         {@link UserController}
     */
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public ResourceSupport userApiUsage() {
        UserControllerResourceAssembler userControllerResourceAssembler = new UserControllerResourceAssembler();
        UserControllerResource result = userControllerResourceAssembler
                .toResource(this);

        return result;
    }

    /**
     * Authenticates clients
     * 
     * @param user
     *            needs a name and password minimum for authentication
     * @param res
     *            {@link HttpServletResponse}
     * @return {@link User} object and sets the token in the response headers
     * @throws Exception
     *             If authentication fails
     */
    @RequestMapping(method = RequestMethod.POST, value = AUTH)
    public User getAuth(@RequestBody User user, HttpServletResponse res)
            throws Exception {

        User result = userService.getUserByName(user.getName());

        ValidationUtil.checkForNull(result, USER_NOT_FOUND);
        if (user.getPassword().equals(result.getPassword())) {
            String token = TokenUtil.getToken(result);

            res.setHeader("Token", token);

            String message = "authenticated user: ";
            LoggingUtil.createInfoAndDebugLog(log, message, result);

            return result;
        }
        throw new Exception("Invalid user credentials");
    }

    /**
     * Adds a user to the db
     * 
     * @param user
     *            user to be added
     * @return {@link UserResource} with a self link
     * @throws Exception
     *             If a username is taken
     */
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public UserResource addUser(@RequestBody User user) throws Exception {

        ValidationUtil.validateUser(user);

        // if no user is found we can add the new user
        User userByName = userService.getUserByName(user.getName());
        if (userByName == null) {
            User addUser = userService.addUser(user);

            UserResourceAssembler userResourceAssembler = new UserResourceAssembler();
            UserResource resource = userResourceAssembler.toResource(addUser);

            String message = "added user: ";
            LoggingUtil.createInfoAndDebugLog(log, message, user);

            return resource;
        }
        throw new Exception("Username taken");

    }

    /**
     * Updates user in db
     * 
     * @param user
     *            user to be updated
     * @return the updated user
     * @throws Exception
     *             If validation fails
     */
    @RequestMapping(method = RequestMethod.PUT)
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public User updateUser(@RequestBody User user) throws Exception {

        ValidationUtil.validateUser(user);
        ValidationUtil.checkIfUserHasAccess(user);

        User addUser = userService.addUser(user);

        String message = "updated user: ";
        LoggingUtil.createInfoAndDebugLog(log, message, user);

        return addUser;
    }

    /**
     * Gets a user from db
     * 
     * @param id
     *            User id
     * @return the requested user
     * @throws Exception
     *             if validation fails
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public User getUser(@PathVariable String id) throws Exception {
        User user = userService.getUser(id);

        ValidationUtil.checkForNull(user, USER_NOT_FOUND);
        ValidationUtil.checkIfUserHasAccess(user);

        log.debug("getting user: " + user);
        return user;
    }

    /**
     * Removes user
     * 
     * @param id
     *            user id
     * @return the removed user
     * @throws Exception
     *             if validation fails
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public User removeUser(@PathVariable String id) throws Exception {

        User user = userService.getUser(id);
        ValidationUtil.checkForNull(user, USER_NOT_FOUND);

        ValidationUtil.checkIfUserHasAccess(user);
        userService.removeUser(id);

        String message = "remove user: ";
        LoggingUtil.createInfoAndDebugLog(log, message, user);

        return user;
    }

    /**
     * Handles bad requests
     * 
     * @param e
     *            exception
     * @param req
     *            {@link HttpServletRequest}
     * @return {@link ErrorInfo} as json
     * @throws JsonProcessingException
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorInfo badRequest(Exception e, HttpServletRequest req)
            throws JsonProcessingException {

        return new ErrorInfo(req.getRequestURL().toString(), e);
    }
}
