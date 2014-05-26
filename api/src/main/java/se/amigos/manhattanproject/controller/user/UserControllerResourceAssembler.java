package se.amigos.manhattanproject.controller.user;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import org.apache.log4j.Logger;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;

/**
 * Assembler that converts {@link UserController} to
 * {@link UserControllerResource}
 * 
 * @author fidde
 *
 */
public class UserControllerResourceAssembler extends
        ResourceAssemblerSupport<UserController, UserControllerResource> {

    private Logger logger = Logger
            .getLogger(UserControllerResourceAssembler.class);

    public UserControllerResourceAssembler() {
        super(UserController.class, UserControllerResource.class);
    }

    @Override
    public UserControllerResource toResource(UserController entity) {
        UserControllerResource result = new UserControllerResource();

        try {
            Link auth = linkTo(
                    methodOn(UserController.class).getAuth(null, null))
                    .withRel("authentication");

            result.add(auth);

            Link add = linkTo(methodOn(UserController.class).addUser(null))
                    .withRel("add user");

            result.add(add);

            Link update = linkTo(
                    methodOn(UserController.class).updateUser(null)).withRel(
                    "update user");

            result.add(update);

            Link get = linkTo(methodOn(UserController.class).getUser("id"))
                    .withRel("get user");

            result.add(get);

            Link delete = linkTo(
                    methodOn(UserController.class).removeUser("id")).withRel(
                    "delete user");

            result.add(delete);

        } catch (Exception e) {
            logger.debug(e.getMessage());

        }

        return result;
    }

}
