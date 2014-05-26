package se.amigos.manhattanproject.domain.backlog;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import org.junit.Before;
import org.junit.Test;

import se.amigos.manhattanproject.domain.task.Task;
import se.amigos.manhattanproject.domain.task.TaskStatus;

public class TaskTest {

    private Task task;

    @Before
    public void setUp() throws Exception {
        task = new Task();
    }

    @Test
    public void testGetTask() {
        assertNotNull("can get task", task);
    }

    @Test
    public void testGetName() throws Exception {
        String name = task.getName();
        assertNull("can get name", name);
    }

    @Test
    public void testGetDescription() throws Exception {
        String desc = task.getDescription();
        assertNull("can get desc", desc);
    }

    @Test
    public void testGetStatus() throws Exception {
        TaskStatus status = task.getState();
        assertEquals("can get status", TaskStatus.TODO, status);
    }

    @Test
    public void testGetEstimate() throws Exception {
        int expected = 0;
        int hours = task.getEstimate();
        assertEquals("can get estimate", expected, hours);
    }

    @Test
    public void testGetAssignedTo() throws Exception {
        String user = task.getAssignedTo();
        assertNull("can get assigned user", user);
    }

}
