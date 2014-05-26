package se.amigos.manhattanproject.domain.backlog;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.util.Set;

import org.junit.Before;
import org.junit.Test;

import se.amigos.manhattanproject.domain.task.Task;
import se.amigos.manhattanproject.domain.userstory.UserStory;
import se.amigos.manhattanproject.domain.userstory.UserStoryType;

public class UserStoryTest {

    private UserStory userStory;

    @Before
    public void setUp() throws Exception {
        userStory = new UserStory();
    }

    @Test
    public void testGetStory() {
        assertNotNull("can get story", userStory);
    }

    @Test
    public void testGetName() throws Exception {
        String name = userStory.getName();
        assertNull("can get name", name);
    }

    @Test
    public void testGetEstimatesPoints() throws Exception {
        int estimatesPoints = userStory.getEstimate();
        assertEquals("can get points", 0, estimatesPoints);
    }

    @Test
    public void testGetDescription() throws Exception {
        String description = userStory.getDescription();
        assertNull("can get desc", description);
    }

    @Test
    public void testGetType() throws Exception {
        UserStoryType type = userStory.getType();
        assertNull("can get type", type);
    }

    @Test
    public void testGetUser() throws Exception {
        String user = userStory.getAuthor();
        assertNull("can get user", user);
    }

    @Test
    public void testGetTasks() throws Exception {
        Set<Task> tasks = userStory.getTasks();
        assertNotNull("can get tasks", tasks);
    }

    @Test
    public void testGetTag() throws Exception {
        String tag = userStory.getTag();
        assertNull("can get tag", tag);
    }
}
