package se.amigos.manhattanproject.domain.user;

import org.apache.log4j.Logger;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;

import se.amigos.manhattanproject.controller.user.UserController;

/**
 * Assembler that converts {@link User} to {@link UserResource}
 * 
 * @author fidde
 *
 */
public class UserResourceAssembler extends
        ResourceAssemblerSupport<User, UserResource> {

    private Logger logger = Logger.getLogger(UserResource.class);

    public UserResourceAssembler() {
        super(UserController.class, UserResource.class);
    }

    @Override
    public UserResource toResource(User entity) {
        UserResource result = createResourceWithId(entity.getId(), entity);
        logger.debug("created resource: " + result);

        return result;
    }
}
