package se.amigos.manhattanproject.controller.api;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;

import org.springframework.hateoas.Link;
import org.springframework.hateoas.ResourceSupport;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import se.amigos.manhattanproject.controller.user.UserController;

/**
 * Api controller provides a hypermedia interface for users to explore the api
 * 
 * @author fidde
 *
 */
@RestController
public class ApiController {

    public static final String API = "/api";

    /**
     * Creates hypermedia links
     * 
     * @return api links as json
     */
    @RequestMapping(value = API, method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public ResourceSupport getApiUsage() {
        ResourceSupport resourceSupport = new ResourceSupport();

        Link usersLink = linkTo(UserController.class).withRel("users");
        resourceSupport.add(usersLink);

        return resourceSupport;
    }
}
