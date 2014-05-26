package se.amigos.manhattanproject.controller.security;

import static org.junit.Assert.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import se.amigos.manhattanproject.ApiApplication;
import se.amigos.manhattanproject.config.SecurityConfig;
import se.amigos.manhattanproject.controller.api.ApiController;
import se.amigos.manhattanproject.controller.user.UserController;
import se.amigos.manhattanproject.service.user.UserService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = { ApiApplication.class, SecurityConfig.class, })
public class SecurityConfigTest {

    private static final String API = "/api";
    private static final String USERS = "/users";
    @Autowired
    private FilterChainProxy filterChainProxy;
    private MockMvc mvc;
    private UserController controller;
    @Autowired
    private UserService userService;

    @Before
    public void setUp() throws Exception {
        controller = new UserController(userService);
        mvc = MockMvcBuilders.standaloneSetup(controller)
                .addFilter(filterChainProxy).build();
    }

    @Test
    public void testGetController() {
        assertNotNull("can get controller", controller);
    }

    @Test
    public void testCanGetApiWithoutAuth() throws Exception {
        ApiController apiController = new ApiController();
        mvc = MockMvcBuilders.standaloneSetup(apiController).build();

        mvc.perform(get(API)).andExpect(status().isOk());
    }

    @Test
    public void testGetUsersApi() throws Exception {
        mvc.perform(get(USERS)).andExpect(status().isOk());
    }

}
