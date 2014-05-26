package se.amigos.manhattanproject.controller.user;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Set;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import se.amigos.manhattanproject.ApiApplication;
import se.amigos.manhattanproject.config.MongoConfig;
import se.amigos.manhattanproject.config.SecurityConfig;
import se.amigos.manhattanproject.domain.backlog.Backlog;
import se.amigos.manhattanproject.domain.sprint.Sprint;
import se.amigos.manhattanproject.domain.sprint.SprintState;
import se.amigos.manhattanproject.domain.task.Task;
import se.amigos.manhattanproject.domain.user.User;
import se.amigos.manhattanproject.domain.user.UserResource;
import se.amigos.manhattanproject.domain.userstory.UserStory;
import se.amigos.manhattanproject.service.user.UserService;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes = { ApiApplication.class, MongoConfig.class,
        SecurityConfig.class })
public class UserIntegrationTest {

    private static final String INTEGRATION_TEST = "integration test";
    private static final String NAME = "foo";
    private static final String PASSWORD = "bar";
    private static final String USERS = "/users";
    private MockMvc mvc;

    @Autowired
    UserService userService;
    @Autowired
    private WebApplicationContext context;
    @Autowired
    private FilterChainProxy filter;

    private ObjectMapper mapper;
    private HttpHeaders headers;
    private Link linkToUser;
    private User user;

    @Before
    public void setUp() throws Exception {
        userService.dropAllUsers();
        mvc = MockMvcBuilders.webAppContextSetup(context).addFilter(filter)
                .build();
    }

    @Test
    public void testSubscribeAndUnSubscribe() throws Exception {
        accessApiWithoutAccount();
        createAccount();
        getAuth();
        accessApi();

        getUser();
        tryToGetOtherUser();
        addUserstoryToBacklog();
        startSprint();

        deleteAccount();
        accessApiWithoutAccount();
    }

    private void tryToGetOtherUser() throws Exception {
        String id = userService.addUser(new User("test", "test")).getId();

        mvc.perform(
                get(USERS + "/" + id).contentType(MediaType.APPLICATION_JSON)
                        .headers(headers)).andExpect(status().isUnauthorized());
    }

    private void getAuth() throws Exception {
        String content = mapper.writeValueAsString(user);
        MvcResult result = mvc
                .perform(
                        post(USERS + UserController.AUTH).contentType(
                                MediaType.APPLICATION_JSON).content(content))
                .andExpect(status().isOk()).andReturn();

        String token = result.getResponse().getHeader("Token");
        headers = new HttpHeaders();
        headers.add("Token", token);
    }

    private void deleteAccount() throws Exception {
        sendDelete(USERS + "/" + user.getId());
    }

    private void startSprint() throws Exception {
        User userFromDb = getUserFromDb();

        Sprint sprint = new Sprint();
        sprint.setName("new sprint");
        sprint.setState(SprintState.IN_PROGRESS);

        Set<Backlog> backlogs = userFromDb.getBacklogs();
        Backlog next = backlogs.iterator().next();
        Set<UserStory> userStories = next.getUserStories();
        UserStory story = userStories.iterator().next();

        sprint.getUserStories().add(story);
        Backlog backlog = userFromDb.getBacklogs().iterator().next();
        backlog.getSprints().add(sprint);

        String contentAsString = mapper.writeValueAsString(userFromDb);
        sendPut(contentAsString, USERS);
    }

    private void addUserstoryToBacklog() throws Exception {
        UserStory userstory = getUserstory();
        User userFromDb = getUserFromDb();
        userFromDb.getBacklogs().iterator().next().getUserStories()
                .add(userstory);

        String json = mapper.writeValueAsString(userFromDb);
        sendPut(json, USERS);
    }

    private void sendPut(String json, String url) throws Exception {
        mvc.perform(
                put(url).headers(headers)
                        .contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isAccepted());
    }

    private User getUserFromDb() throws Exception,
            UnsupportedEncodingException, IOException, JsonParseException,
            JsonMappingException {
        MvcResult sendGet = sendGet(linkToUser.getHref());
        String contentAsString = sendGet.getResponse().getContentAsString();

        return mapper.readValue(contentAsString, User.class);
    }

    private void getUser() throws Exception {
        MvcResult result = sendGet(linkToUser.getHref());

        String json = result.getResponse().getContentAsString();
        user = mapper.readValue(json, User.class);
    }

    private void accessApi() throws Exception {
        sendGet(USERS);
    }

    private void createAccount() throws Exception {
        user = new User(NAME, PASSWORD);
        mapper = new ObjectMapper();

        // we save the user and store the link to it
        String json = mapper.writeValueAsString(user);

        MvcResult result = mvc
                .perform(
                        post(USERS).contentType(MediaType.APPLICATION_JSON)
                                .content(json)).andExpect(status().isCreated())
                .andReturn();

        json = result.getResponse().getContentAsString();
        UserResource readValue = mapper.readValue(json, UserResource.class);
        linkToUser = readValue.getId();
    }

    private void accessApiWithoutAccount() throws Exception {
        mvc.perform(get(USERS)).andExpect(status().isOk());
    }

    private MvcResult sendGet(String url) throws Exception {
        MvcResult result = mvc.perform(get(url).headers(headers))
                .andExpect(status().isOk()).andReturn();

        return result;
    }

    private MvcResult sendPost(String content, String url) throws Exception {
        return mvc
                .perform(
                        post(url).headers(headers)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content))
                .andExpect(status().isCreated()).andReturn();
    }

    private void sendDelete(String url) throws Exception {
        mvc.perform(
                delete(url).headers(headers).contentType(
                        MediaType.APPLICATION_JSON)).andExpect(
                status().isAccepted());
    }

    private UserStory getUserstory() {
        UserStory userStory = new UserStory();
        userStory.setName(INTEGRATION_TEST);

        Task task = new Task();
        task.setName(INTEGRATION_TEST);

        userStory.getTasks().add(task);

        return userStory;
    }
}
