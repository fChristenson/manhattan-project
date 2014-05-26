package se.amigos.manhattanproject.domain.backlog;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.util.Set;

import org.junit.Before;
import org.junit.Test;

import se.amigos.manhattanproject.domain.sprint.Sprint;
import se.amigos.manhattanproject.domain.userstory.UserStory;

public class BacklogTest {

    private Backlog backlog;

    @Before
    public void setUp() throws Exception {
        backlog = new Backlog();
    }

    @Test
    public void testGetBacklog() {
        assertNotNull("can get log", backlog);
    }

    @Test
    public void testGetId() throws Exception {
        String id = backlog.getId();
        assertNotNull("can get id", id);
    }

    @Test
    public void testGetUserStories() throws Exception {
        Set<UserStory> userStories = backlog.getUserStories();
        assertNotNull("can get userstories", userStories);
    }

    @Test
    public void testGetUsers() throws Exception {
        Set<String> users = backlog.getTeamMembers();
        assertNotNull("can get users", users);
    }

    @Test
    public void testGetName() throws Exception {
        String name = backlog.getName();
        assertNull("can get name", name);
    }

    @Test
    public void testGetOwner() throws Exception {
        String owner = backlog.getOwner();
        assertNull("can get owner", owner);
    }

    @Test
    public void testGetStakeHolders() throws Exception {
        Set<String> stakeHolders = backlog.getStakeholders();
        assertNotNull("can get stakeHolders", stakeHolders);
    }

    @Test
    public void testGetSprints() throws Exception {
        Set<Sprint> sprints = backlog.getSprints();
        assertNotNull("can get sprints", sprints);
    }
}
