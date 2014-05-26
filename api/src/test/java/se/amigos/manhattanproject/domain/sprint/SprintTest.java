package se.amigos.manhattanproject.domain.sprint;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.util.Set;

import org.junit.Before;
import org.junit.Test;

import se.amigos.manhattanproject.domain.userstory.UserStory;

public class SprintTest {

    private Sprint sprint;

    @Before
    public void setup() {
        sprint = new Sprint();
        assertNotNull("This is the sprint: ", sprint);
    }

    @Test
    public void getId() throws Exception {
        String id = sprint.getId();
        assertNotNull("can get id", id);
    }

    @Test
    public void getSprintName() {
        String name = sprint.getName();
        assertNull("This is the Sprint name: ", name);
    }

    @Test
    public void getSprintStartDate() {
        long startDate = sprint.getStartDate();
        assertNotNull("This is the Sprint start date: ", startDate);
    }

    @Test
    public void getSprintEndDate() {
        long endDate = sprint.getEndDate();
        assertNotNull("This is the Sprint end date: ", endDate);
    }

    @Test
    public void getSprintDetails() {
        String details = sprint.getDetails();
        assertNull("These are the Sprint details: ", details);
    }

    @Test
    public void getSprintState() {
        SprintState state = sprint.getState();
        assertEquals("This is the Sprint state: ", SprintState.IN_PLANNING,
                state);
    }

    @Test
    public void testGetUserStories() throws Exception {
        Set<UserStory> userStories = sprint.getUserStories();
        assertNotNull("can get userstories", userStories);
    }

}
