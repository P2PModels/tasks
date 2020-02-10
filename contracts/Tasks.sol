pragma solidity ^0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";


contract Tasks is AragonApp {


    bytes32 constant public CREATE_TASK_ROLE = keccak256("CREATE_TASK_ROLE");
    bytes32 constant public CHANGE_PRIORITY_ROLE = keccak256("CHANGE_PRIORITY_ROLE");
    bytes32 constant public DELETE_TASK_ROLE = keccak256("DELETE_TASK_ROLE");
    bytes32 constant public COMPLETE_TASK_ROLE = keccak256("COMPLETE_TASK_ROLE");

    enum Priority {HIGH, MEDIUM, LOW}

    struct Task {
        string name;
        Priority priority;
        bool complete;
    }

    mapping (uint=>Task) taskList;
    uint taskCounter;

    event CreateTask(address sender, string name, Priority priority, uint tId);
    event ChangePriority(address sender, uint tId, Priority priority);
    event DeleteTask(address sender,uint tId);
    event CompleteTask(address sender, uint tId);

    function initialize() public onlyInit {
        initialized();
    }

    function createTask(string name, Priority priority) auth(CREATE_TASK_ROLE) public {

        Task memory t = Task({name : name, priority: priority, complete: false});
        taskList[taskCounter] = t;
        emit CreateTask(msg.sender, t.name, t.priority, taskCounter);
        taskCounter = taskCounter + 1;
    }

    function changePriority(uint tId, Priority p) auth(CHANGE_PRIORITY_ROLE) public {
        taskList[tId].priority=p;
        emit ChangePriority(msg.sender, tId, p);
    }

    function deleteTask(uint tId) auth(DELETE_TASK_ROLE) public {
        delete taskList[tId];
        emit DeleteTask(msg.sender, tId);
    }

    function completeTask(uint tId) auth(COMPLETE_TASK_ROLE) public {
        taskList[tId].complete = true;
        emit CompleteTask(msg.sender, tId);
    }
}
